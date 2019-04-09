FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 8080

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY Area_api/Area.Api/Area.Api.csproj Area_api/Area.Api/
RUN dotnet restore Area_api/Area.Api/Area.Api.csproj
COPY . .
WORKDIR /src/Area_api/Area.Api
RUN dotnet build Area.Api.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish Area.Api.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Area.Api.dll"]