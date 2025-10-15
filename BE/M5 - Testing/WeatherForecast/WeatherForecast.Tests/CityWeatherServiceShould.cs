using Moq;
using WeatherForecast.Services;
using WeatherForecast.Contracts;
using WeatherForecast.Exceptions;

namespace WeatherForecast.Tests
{
    [TestClass]
    public class CityWeatherServiceShould
    {
        private readonly Mock<IWeatherService> _mockWeatherService;
        private readonly CityWeatherService _cityWeatherService;

        public CityWeatherServiceShould() {
            _mockWeatherService = new Mock<IWeatherService>();
            _cityWeatherService = new CityWeatherService(_mockWeatherService.Object);
        }

        // Verificar que se lanza una excepción ArgumentNullException cuando se pasa un null como ciudad.
        [TestMethod]
        public void ThrowsArgumentNullException_WhenCityIsNull()
        {
            Assert.ThrowsException<ArgumentNullException>(() => _cityWeatherService.GetWeather(null));
        }

        // Verificar que se lanza una excepción CityNotFoundException cuando la ciudad no existe.
        [TestMethod]
        public void ThrowsCityNotFoundException_WhenCityIsNotFound()
        {
            Assert.ThrowsException<CityNotFoundException>(() => _cityWeatherService.GetWeather("Orlando"));
        }

        // Verificar que se devuelve Weather.Sunny si la probabilidad de lluvia es menor a 20.
        [TestMethod]
        public void ReturnSunny_WhenProbabilityIsLessThan20()
        {
            _mockWeatherService.Setup(m => m.RainProbability()).Returns(15);
            var result = _cityWeatherService.GetWeather("Málaga");
            Assert.AreEqual(Weather.Sunny, result);
        }

        // Verificar que se devuelve Weather.Cloudy si la probabilidad de lluvia está entre 20 y 49.
        [TestMethod]
        public void ReturnCloudy_WhenProbabilityBetween20And49()
        {
            _mockWeatherService.Setup(s => s.RainProbability()).Returns(30);
            var result = _cityWeatherService.GetWeather("Málaga");
            Assert.AreEqual(Weather.Cloudy, result);
        }

        // Verificar que se devuelve Weather.Rainy si la probabilidad de lluvia está entre 50 y 79.
        [TestMethod]
        public void GetWeather_ShouldReturnRainy_WhenProbabilityBetween50And79()
        {
            _mockWeatherService.Setup(s => s.RainProbability()).Returns(65);
            var result = _cityWeatherService.GetWeather("Málaga");
            Assert.AreEqual(Weather.Rainy, result);
        }

        // Verificar que se devuelve Weather.Stormy si la probabilidad de lluvia es 80 o mayor.
        [TestMethod]
        public void GetWeather_ShouldReturnStormy_WhenProbabilityIs80OrGreater()
        {
            _mockWeatherService.Setup(s => s.RainProbability()).Returns(85);
            var result = _cityWeatherService.GetWeather("Málaga");
            Assert.AreEqual(Weather.Stormy, result);
        }
    }
}
