

using WeatherForecast.Services;

namespace WeatherForecast.Tests
{
    [TestClass]
    public class RandomWeatherServiceShould
    {
        private readonly RandomWeatherService _randomWeatherService;

        public RandomWeatherServiceShould()
        {
            _randomWeatherService = new RandomWeatherService();
        }

        [TestMethod]
        public void ReturnNumberBetween0And100()
        {
            for (int i = 0; i < 100; i++)
            {
                int result = _randomWeatherService.RainProbability();
                Assert.IsTrue(result >= 0 && result <= 100, $"Value {result} is out of range.");
            }
        }
    }
}
