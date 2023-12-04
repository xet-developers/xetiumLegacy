using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace xetiumAPI.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "keyword",
                columns: table => new
                {
                    keywordid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    text = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_keyword", x => x.keywordid);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    username = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    passworhash = table.Column<byte[]>(type: "bytea", nullable: false),
                    salt = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    email = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    phone = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.username);
                });

            migrationBuilder.CreateTable(
                name: "project",
                columns: table => new
                {
                    projid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    url = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    username = table.Column<string>(type: "character varying(255)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_project", x => x.projid);
                    table.ForeignKey(
                        name: "FK_project_users_username",
                        column: x => x.username,
                        principalTable: "users",
                        principalColumn: "username",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tokens",
                columns: table => new
                {
                    tokenid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    tokenvalue = table.Column<byte[]>(type: "bytea", nullable: false),
                    username = table.Column<string>(type: "character varying(255)", nullable: false),
                    expiresat = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    lastusedat = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    type = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tokens", x => x.tokenid);
                    table.ForeignKey(
                        name: "FK_tokens_users_username",
                        column: x => x.username,
                        principalTable: "users",
                        principalColumn: "username",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "search",
                columns: table => new
                {
                    searchid = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    projid = table.Column<int>(type: "integer", nullable: false),
                    date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    type = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_search", x => x.searchid);
                    table.ForeignKey(
                        name: "FK_search_project_projid",
                        column: x => x.projid,
                        principalTable: "project",
                        principalColumn: "projid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "keywordresult",
                columns: table => new
                {
                    searchid = table.Column<int>(type: "integer", nullable: false),
                    keywordid = table.Column<int>(type: "integer", nullable: false),
                    position = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_keywordresult", x => new { x.searchid, x.keywordid });
                    table.ForeignKey(
                        name: "FK_keywordresult_keyword_keywordid",
                        column: x => x.keywordid,
                        principalTable: "keyword",
                        principalColumn: "keywordid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_keywordresult_search_searchid",
                        column: x => x.searchid,
                        principalTable: "search",
                        principalColumn: "searchid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_keywordresult_keywordid",
                table: "keywordresult",
                column: "keywordid");

            migrationBuilder.CreateIndex(
                name: "IX_project_username",
                table: "project",
                column: "username");

            migrationBuilder.CreateIndex(
                name: "IX_search_projid",
                table: "search",
                column: "projid");

            migrationBuilder.CreateIndex(
                name: "IX_tokens_username",
                table: "tokens",
                column: "username",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "keywordresult");

            migrationBuilder.DropTable(
                name: "tokens");

            migrationBuilder.DropTable(
                name: "keyword");

            migrationBuilder.DropTable(
                name: "search");

            migrationBuilder.DropTable(
                name: "project");

            migrationBuilder.DropTable(
                name: "users");
        }
    }
}
