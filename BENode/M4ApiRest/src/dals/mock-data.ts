import { ObjectId, Decimal128 } from 'mongodb';
import { House } from './house/index.js';

// Real documents taken from the airbnb backup (only the fields we use)

export interface DB {
  houses: House[];
}

export const db: DB = {
  houses: [
    {
      _id: new ObjectId('65097600a74000a4a4a226ba'),
      name: 'Your spot in Copacabana',
      description:
        'Having a large airy living room. The apartment is well divided. Fully furnished and cozy. The building has a 24h doorman and camera services in the corridors. It is very well located, close to the beach, restaurants, pubs and several shops and supermarkets. And it offers a good mobility being close to the subway. The apartment is carefully prepared to receive up to 8 people very comfortably and airy and very well organized to offer you a great stay in Rio de Janeiro. I am available to assist and answer questions regarding the use of the apartment and everything we can to make your stay a success! The location is perfect, close to the beach, the Lido Square and the Copacabana Palace, right next to subway station, and has many bars, restaurants, markets, shops and craft fair and trade in general in the surroundings. The apartment is three blocks from Cardinal Arcoverde subway station. Great transport variety. There is no parking in the building.',
      images: {
        picture_url:
          'https://a0.muscache.com/im/pictures/83dbb5af-8b0c-48a4-b210-4fb60d642119.jpg?aki_policy=large',
      },
      address: {
        street: 'Rio de Janeiro, Rio de Janeiro, Brazil',
        country: 'Brazil',
      },
      bedrooms: 2,
      beds: 5,
      bathrooms: new Decimal128('2.0'),
      price: new Decimal128('798.00'),
      reviews: [
        {
          _id: '93692209',
          date: new Date('2016-08-13T04:00:00.000Z'),
          listing_id: '10264100',
          reviewer_id: '2840692',
          reviewer_name: 'Tim',
          comments:
            'Fantastic apartment in a perfect location. Ana Lucia made us feel right at home with fresh fruit and snacks! The apt is blocks away from the beach, near tons of great food (Go to Amir and Galeto Sats, thank me later) and plenty of places to hang out with locals (Bip Bip). Highly recommend staying here for your visit to Copacabana.',
        },
        {
          _id: '115960775',
          date: new Date('2016-11-27T05:00:00.000Z'),
          listing_id: '10264100',
          reviewer_id: '103110814',
          reviewer_name: 'Gesiani',
          comments:
            'Ana Lucia foi muito prestativa, nos recebeu super bem, apartamento bem equipado e bem localizado, próximo a praia, transporte público, restaurantes...superou todas as nossas expectativas!!',
        },
        {
          _id: '121467407',
          date: new Date('2016-12-17T05:00:00.000Z'),
          listing_id: '10264100',
          reviewer_id: '107126702',
          reviewer_name: 'Clarissa',
          comments:
            'Ana Lúcia foi super atenciosa, rápida nas respostas e flexível com meus horários de check-in e check-out. O apartamento é ótimo e super bem localizado!',
        },
        {
          _id: '130526582',
          date: new Date('2017-02-06T05:00:00.000Z'),
          listing_id: '10264100',
          reviewer_id: '111737379',
          reviewer_name: 'Ademilson',
          comments: 'muito bom',
        },
        {
          _id: '197736087',
          date: new Date('2017-09-26T04:00:00.000Z'),
          listing_id: '10264100',
          reviewer_id: '142806855',
          reviewer_name: 'Gabriel',
          comments:
            'Ana Lúcia nos atendeu muito bem e tirou todas as dúvidas da estadia, além de nos orientar em algumas questões. Parabéns pelo ótimo atendimento!',
        },
        {
          _id: '199211746',
          date: new Date('2017-10-01T04:00:00.000Z'),
          listing_id: '10264100',
          reviewer_id: '151970252',
          reviewer_name: 'Yuri',
          comments: 'Adorei!',
        },
        {
          _id: '241055176',
          date: new Date('2018-03-07T05:00:00.000Z'),
          listing_id: '10264100',
          reviewer_id: '175824532',
          reviewer_name: 'Cintia',
          comments: 'Ótimo apartamento, bem equipado e em ótima localização',
        },
        {
          _id: '244335930',
          date: new Date('2018-03-18T04:00:00.000Z'),
          listing_id: '10264100',
          reviewer_id: '54276772',
          reviewer_name: 'Andrea',
          comments:
            'Ótimo apartamento, bem equipado, limpo, confortável. Localização perfeita, muitos comércios na redondeza, perto da praia.\nFomos muito bem recebidos pela anfitriã que foi bem flexível com o horário de checkin.',
        },
      ],
    },
    {
      _id: new ObjectId('65097600a74000a4a4a229d7'),
      name: 'Céntrica Habitación',
      description:
        'Nos encanta la ubicación estratégica y el fácil acceso de transporte para dirigirte a todos los lugares turísticos de Barcelona, en nuestro entorno poseemos gym, supermercados, restaurantes, bares, 10 minutos de la playa y lugares de intereses turísticos ! Cocina, baño, balcón, áreas comunes Lo necesario, y a la disposición del huesped Nos encanta la ubicación estratégica y el fácil acceso de transporte para dirigirte a todos los lugares turísticos de Barcelona, en nuestro entorno poseemos gym, supermercados, restaurantes, bares, 10 minutos de la playa y lugares de intereses turísticos ! Bien comunicado a una calle de  la estación La Monumental y diversas líneas de buses',
      images: {
        picture_url:
          'https://a0.muscache.com/im/pictures/d59b2747-de68-49a5-a535-c4653043d823.jpg?aki_policy=large',
      },
      address: {
        street: 'Barcelona, a tres cuadras de La Sagrada Flia., Spain',
        country: 'Spain',
      },
      bedrooms: 1,
      beds: 1,
      bathrooms: new Decimal128('1.0'),
      price: new Decimal128('20.00'),
      reviews: [
        {
          _id: '97838427',
          date: new Date('2016-08-28T04:00:00.000Z'),
          listing_id: '14563257',
          reviewer_id: '32605298',
          reviewer_name: 'Elise',
          comments:
            'El piso de Isa esta muy bien ubicado, muy cerca de la Sagrada familia y de la parada de metro monumental.\nTe hace sentir como a casa con un desayuno tipico por la mañana de pan con tomate y cafe.\nTodo ha sido muy bien ! Gracias :)',
        },
        {
          _id: '99569906',
          date: new Date('2016-09-05T04:00:00.000Z'),
          listing_id: '14563257',
          reviewer_id: '34670202',
          reviewer_name: 'Cristian',
          comments:
            'Muy buena estancia. Muy recomendable. Fui recibido muy cordialmente y siempre estuvo atenta a ayudarme con algo o si necesitaba ayuda en algo. Muy atenta y acogedora en su apartamento. Ademas muy limpio y en general el apartamento  muy bonito. La ubicacion tambien es excelente.',
        },
        {
          _id: '101172803',
          date: new Date('2016-09-12T04:00:00.000Z'),
          listing_id: '14563257',
          reviewer_id: '26286145',
          reviewer_name: 'Andrea',
          comments:
            "This is a great neighbourhood close to La Sagrada Familia. The host was lovely and made me empanadas for breakfast. A slight setback was that I didn't get my own key, so we had to agree on when I would come home. Since I am not fluent in Spanish this was a challenge.",
        },
        {
          _id: '102527274',
          date: new Date('2016-09-18T04:00:00.000Z'),
          listing_id: '14563257',
          reviewer_id: '79264419',
          reviewer_name: 'Julius',
          comments: 'Ana was a very kind host.',
        },
        {
          _id: '103420988',
          date: new Date('2016-09-22T04:00:00.000Z'),
          listing_id: '14563257',
          reviewer_id: '4197729',
          reviewer_name: 'Diego',
          comments: 'Todo bien',
        },
        {
          _id: '104591728',
          date: new Date('2016-09-27T04:00:00.000Z'),
          listing_id: '14563257',
          reviewer_id: '48560176',
          reviewer_name: 'Priscilla',
          comments:
            'Ana é uma senhora muito amável e prestativa,estava tudo perfeito!',
        },
      ],
    },
    {
      _id: new ObjectId('65097600a74000a4a4a22b23'),
      name: 'Room with a double bed close to Arc de Triomf',
      description:
        "The flat is greatly located, quite close to the city center but not in the middle of it. There's great public transport comunication, lots of shops, supermarkets close by. The room has a double bed and next door has a toilet you'll be able to use. The terrace is a big plus, after a tiring walk around the city, to enjoy the calmness outside. We are two friends sharing a flat. We love to travel and meet new people and traditions. The wonderful terrace is like an oasi in middle of the city, is perfect to enjoy breakfast, or chilling out after a tiring day in the city. The kitchen is only available for breakfast, no other meals are allowed to cook in the house. It's completely forbidden to eat in the room. If we are around, we like to share with our guests, how they are doing if they need any further information or just where to have a good spanish meal... We have at least 5 different buses, metro L1 (red) L2 (purple) and train in less than 5 minutes walking. Also the main international bu",
      images: {
        picture_url:
          'https://a0.muscache.com/im/pictures/60b74be8-eb9c-4289-9d1e-8815a3e091c1.jpg?aki_policy=large',
      },
      address: {
        street: 'Barcelona, Catalunya, Spain',
        country: 'Spain',
      },
      bedrooms: 1,
      beds: 1,
      bathrooms: new Decimal128('1.5'),
      price: new Decimal128('45.00'),
      reviews: [
        {
          _id: '137249884',
          date: new Date('2017-03-14T04:00:00.000Z'),
          listing_id: '16308292',
          reviewer_id: '112753772',
          reviewer_name: 'Holly',
          comments:
            "Yolanda and Vanessa were great hostesses! This was my first Airbnb, so I didn't know what to expect. The room was very confortable, we had our own bathroom, and the location was perfect. It was easy to walk wherever we wanted to go from our hostel! The ladies also had good suggestions for places to eat and things to do! Highly recommend this Airbnb.",
        },
        {
          _id: '160017060',
          date: new Date('2017-06-12T04:00:00.000Z'),
          listing_id: '16308292',
          reviewer_id: '126303023',
          reviewer_name: 'Josh',
          comments:
            'Close to a lot in the city, Yolanda was very helpful. Would recommend staying here.',
        },
        {
          _id: '167628146',
          date: new Date('2017-07-07T04:00:00.000Z'),
          listing_id: '16308292',
          reviewer_id: '56435491',
          reviewer_name: 'Solene',
          comments:
            'Yolanda and her roomate are very nice host. It was easy to communicate  and it was not a problem that we arrive late in the evening. Everything was ok with the flat. We had a very good time in Barcelona ! Thanks :)',
        },
        {
          _id: '168906238',
          date: new Date('2017-07-10T04:00:00.000Z'),
          listing_id: '16308292',
          reviewer_id: '139485855',
          reviewer_name: 'Manuel',
          comments:
            'The host canceled this reservation 22 days before arrival. This is an automated posting.',
        },
        {
          _id: '180436303',
          date: new Date('2017-08-10T04:00:00.000Z'),
          listing_id: '16308292',
          reviewer_id: '126611380',
          reviewer_name: 'Andrea',
          comments:
            'Comfortable, clean, excellent price, easy check-in/check-out. The best thing is the great and fast communication. I Would definitively come back again!',
        },
        {
          _id: '186297453',
          date: new Date('2017-08-24T04:00:00.000Z'),
          listing_id: '16308292',
          reviewer_id: '48565932',
          reviewer_name: 'Marta',
          comments:
            'Recomendo a Yolanda. Pueden ir sin problema. Es muy atenta y generosa. Si vuelvo a Barcelona vuelvo tambien en casa de Yolanda. Gracias por todo, todo estaba perfecto.',
        },
        {
          _id: '417417646',
          date: new Date('2019-02-27T05:00:00.000Z'),
          listing_id: '16308292',
          reviewer_id: '243651002',
          reviewer_name: 'Emiliana',
          comments:
            'Yolanda was a great host! She gave us tips for sightseeing, help us with any problem and so easy to communicate with her. Everything was fine at the appartament! We had a great time in Barcelona. Thank you!!',
        },
      ],
    },
    {
      _id: new ObjectId('65097600a74000a4a4a22b6d'),
      name: 'Luxury 4 Seasons Lodge',
      description:
        'Perfect flat for relaxing family holiday, with all facilities including TV and wifi. Very close to beautiful beaches, and easy access to Porto city, via motorway or public transportation (train). Supermarket, bakery, healthcare, pharmacy @ 200m. Spacious flat, from a big room with private WC up to a generous living and dinning room. The big windows ensure lots of light, making the environment very cosy. The guests have access to the entire house, including a balcony where a  small table can be great for relaxing moments. I am available to help in anything, before or during the stay. Very quite neighbourhood, the house is not in a main street, thus ensuring no noise. 900m from the closest beach. 1,7kms from Granja train station (25 min from Porto city center). 20kms from Porto, via motorway.',
      images: {
        picture_url:
          'https://a0.muscache.com/im/pictures/c65ec8c0-6be8-4167-ae49-6403fc339633.jpg?aki_policy=large',
      },
      address: {
        street: 'São Félix da Marinha, Porto, Portugal',
        country: 'Portugal',
      },
      bedrooms: 2,
      beds: 2,
      bathrooms: new Decimal128('2.0'),
      price: new Decimal128('47.00'),
      reviews: [
        {
          _id: '144643523',
          date: new Date('2017-04-16T04:00:00.000Z'),
          listing_id: '16701536',
          reviewer_id: '20402822',
          reviewer_name: 'Vanessa',
          comments:
            'El apartamento 100% recomendado, espacioso, limpio, tiene cerca supermercados, farmacia y playas. 100% recomendable',
        },
        {
          _id: '149119472',
          date: new Date('2017-05-02T04:00:00.000Z'),
          listing_id: '16701536',
          reviewer_id: '114121614',
          reviewer_name: 'Christoph',
          comments:
            'Netter Kontakt mit dem Eigentümer, Unterkunft wie beschrieben, ruhige Nachbarschaft. Gerne wieder bei Gelegenheit ',
        },
        {
          _id: '180487428',
          date: new Date('2017-08-10T04:00:00.000Z'),
          listing_id: '16701536',
          reviewer_id: '3202983',
          reviewer_name: 'Alan',
          comments:
            'Amazing apartment in a very convenient area between Porto and Espinho. All amenities we could have wanted were catered for. Very secure location. Highly recommended stay!',
        },
        {
          _id: '311024262',
          date: new Date('2018-08-20T04:00:00.000Z'),
          listing_id: '16701536',
          reviewer_id: '128075415',
          reviewer_name: 'Estelle',
          comments:
            'Superbe endroit, grand, bien placé. Très bon rapport qualité prix. À recommander.',
        },
        {
          _id: '320189494',
          date: new Date('2018-09-08T04:00:00.000Z'),
          listing_id: '16701536',
          reviewer_id: '33441300',
          reviewer_name: 'Dominik',
          comments:
            'The place is huge and you’ll find everything you need. Rui is always available if you need him. Enjoy your stay.',
        },
        {
          _id: '366258073',
          date: new Date('2019-01-02T05:00:00.000Z'),
          listing_id: '16701536',
          reviewer_id: '231834258',
          reviewer_name: 'António',
          comments: 'Acolhedor, funcional e limpo.',
        },
      ],
    },
  ],
};
