using Medo;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using xetiumAPI.ServerApp.Dal;
using xetiumAPI.ServerApp.Dal.Models.Repository;
using xetiumAPI.ServerApp.Service;
using Assert = Microsoft.VisualStudio.TestTools.UnitTesting.Assert;

namespace Test;

public class ClusteringTest
{
    private ClusteringService _clusteringService;
    
    [SetUp]
    public void Setup()
    {
        _clusteringService = new ClusteringService(new HttpClient());
    }

    [Test]
    public async Task GetClustering()
    {
        var query = "скачать фильм, лучшие фильмы 2023 года, как снять короткометражку, что такое жанр триллер, как написать сценарий, сайт Netflix, подписаться на кинотеатр онлайн, история кино.";
        var result =  await _clusteringService.GetClusterQueriesUsingAiAsync(query);
        Assert.IsNotNull(result);
    }
}