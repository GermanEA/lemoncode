using WeatherForecast.Services;

namespace WeatherForecast.Tests.XUnit
{
    public class CityWeatherServiceShould
    {
        private readonly RandomWeatherService _randomWeatherService;

        public CityWeatherServiceShould()
        {
            _randomWeatherService = new RandomWeatherService();
        }

        [Fact]
        public void ReturnNumberBetween0And100()
        {
            for (int i = 0; i < 1000; i++)
            {
                int result = _randomWeatherService.RainProbability();
                Assert.InRange(result, 0, 100);
            }
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        [InlineData(4)]
        [InlineData(5)]
        [InlineData(6)]
        [InlineData(7)]
        [InlineData(8)]
        [InlineData(9)]
        [InlineData(10)]
        public void RainProbability_ShouldReturnValueBetween0And100(int _)
        {
            int result = _randomWeatherService.RainProbability();
            Assert.InRange(result, 0, 100);
        }
    }
}
