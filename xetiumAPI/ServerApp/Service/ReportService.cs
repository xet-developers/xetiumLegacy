using System.IdentityModel.Tokens.Jwt;
using System.Reflection;
using System.Security.Claims;
using Medo;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using xetiumAPI.Interfaces;
using xetiumAPI.Models;
using xetiumAPI.ServerApp.Dal;
using xetiumAPI.ServerApp.Interfaces;

namespace xetiumAPI.ServerApp.Service
{
    public class ReportService : IReportService
    {
        private IProjectRepository _projectRepository;
        public ReportService(IProjectRepository projectRepository) 
        {
            _projectRepository = projectRepository;
        }

        public async Task<FileStream> GetReportAsync(ReportInfoDto reportInfo, Guid userID)
        {
            var projects = await _projectRepository.GetAllUserProjectAsync(userID);
            var sheetName = new Uuid7().ToString();
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using (var package = new ExcelPackage())
            {
                await CreateAndFillSheetAsync(projects, sheetName, package);
            }

            var fs = File.Open($"{Directory.GetCurrentDirectory()}{sheetName}.xlsx", FileMode.Open);
            return await Task.FromResult(fs);
        }

        private static async Task CreateAndFillSheetAsync(List<ProjectDal> projects, string sheetName, ExcelPackage package)
        {
            ExcelWorksheet sheet = package.Workbook.Worksheets.Add("report");
            sheet.Cells[2, 1].Value = "Ключевые фразы";
            var row = 3;
            var column = 2;
            foreach (var project in projects)
            {
                foreach (var search in project.Searches)
                {
                    FillSheet(sheet, row, column, search);
                }
                column += 2;
            }
            await package.SaveAsAsync(new FileInfo($"{Directory.GetCurrentDirectory()}{sheetName}.xlsx"));
        }

        private static void FillSheet(ExcelWorksheet sheet, int row, int column, SearchDal search)
        {
            SetHeaders(sheet, column);

            foreach (var result in search.KeywordResults)
            {
                var existingRow = FindExistingRow(sheet, row, result.Keyword.Text);
                if (existingRow > 0)
                {
                    SetPosition(sheet, existingRow, column, result);
                }
                else
                {
                    AddNewKeywordResult(sheet, row, column, result);
                }
            }
        }

        private static void SetHeaders(ExcelWorksheet sheet, int column)
        {
            sheet.Cells[1, column].Value = DateTime.Now.ToString();
            sheet.Cells[2, column].Value = "Yandex";
            sheet.Cells[2, column + 1].Value = "Google";
        }

        private static int FindExistingRow(ExcelWorksheet sheet, int row, string keyword)
        {
            for (var i = 1; i < row; i++)
            {
                if (sheet.Cells[i, 1].Value == keyword)
                {
                    return i;
                }
            }
            return -1;
        }

        private static void SetPosition(ExcelWorksheet sheet, int row, int column, KeywordResultDal result)
        {
            if (result.SearchDal.Type == "Yandex")
            {
                sheet.Cells[row, column].Value = result.Position;
            }
            else if (result.SearchDal.Type == "Google")
            {
                sheet.Cells[row, column + 1].Value = result.Position;
            }
        }

        private static void AddNewKeywordResult(ExcelWorksheet sheet, int row, int column, KeywordResultDal result)
        {
            sheet.Cells[row, 1].Value = result.Keyword.Text;
            SetPosition(sheet, row, column, result);
        }
    }


}
