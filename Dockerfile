#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
RUN apt-get update &&\
    apt-get install -y curl &&\
    apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx &&\
    curl -sL https://deb.nodesource.com/setup_lts.x | bash - &&\
    apt-get install -y nodejs
WORKDIR /src
COPY ["xetiumAPI/xetiumAPI.csproj", "xetiumAPI/"]
RUN dotnet restore "xetiumAPI/xetiumAPI.csproj"
COPY . .
WORKDIR "/src/xetiumAPI"
RUN dotnet build "xetiumAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "xetiumAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "xetiumAPI.dll"]