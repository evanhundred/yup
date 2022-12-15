require "open-uri"

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
# ApplicationRecord.transaction do
    puts "Destroying tables..."
    User.destroy_all
    Business.destroy_all

    puts "Resetting primary keys..."
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('businesses')

    puts "Creating users..."
    User.create!(
        name: 'John B.',
        email: 'john@email.io',
        password: 'password'
    )

    10.times do
        first = Faker::Name.first_name
        User.create!({
            name: first + " " + ('A'..'Z').to_a.sample(1).first + ".",
            # email: first + "-" + (Faker::Creature::Animal.name)
            email: Faker::Internet.unique.email(name: first + "." + (Faker::Creature::Animal.name)),
            password: 'password'
        })
    end

    puts "Creating businesses..."

        business1 = Business.create!(
            name: "Devoción",
            latitude: 40.71618202634479,
            longitude: -73.9646328800473,
            address: "69 Grand St",
            city: "Brooklyn",
            state: "NY",
            zipcode: "11249",
            phone: "(718) 285-6180",
            website: "https://www.devocion.com/",
            open_at: "8:00 AM",
            closed_at: "7:00 PM",
            about: "Specialties123
            Farm-to-table coffee roasters. We average 10 days from origin to roast, serving the freshest imaginable.\n
            History123
            Established in 2006.123
            Devoción was Launched in 2006 to produce the freshest coffee imaginable -- roasting provides only half of coffee's flavor, while the mere freshness of the beans does the rest of the work. And yet, most coffee beans sit around for months, losing flavor every day. That's why the Devoción team does everything short of picking the cherry, and do it faster than anyone else -- we hand-select our 1,000+ farm partners, dry-mill at our Bogotá facility, control the export process, and freshly roast in Brooklyn. You will taste the difference in a single sip.",
            category: "Coffee & Tea",
            price: "$")

        business2 = Business.create!(
            name: "El Paso Mexican Grill",
            latitude: 40.63611637171446,
            longitude: -73.96209191552944,
            address: "1610 Newkirk Ave",
            city: "Brooklyn",
            state: "NY",
            zipcode: "11226",
            phone: "(917) 966-1555",
            website: "https://elpasomexicangrillbrooklyn.bestcafes.online/",
            open_at: "8:00 AM",
            closed_at: "10:45 PM",
            about: "Tex Mex Southern Food with a bit of American. We are now serving breakfast!",
            category: "Tex Mex, Mexican",
            price: "$")

        business3 = Business.create!(
            name: "Golden Krust Bakery & Grill",
            latitude: 40.64038446182779,
            longitude: -73.94865705971576,
            address: "2846 Church Ave",
            city: "Brooklyn",
            state: "NY",
            zipcode: "11226",
            phone: "(718) 469-3400",
            website: "https://www.goldenkrust.com/",
            open_at: "7:00 AM",
            closed_at: "8:00 PM",
            about: "In 1989, Lowell Hawthorne, along with his wife Lorna, four of his siblings and their spouses, pooled all of their resources to open the first Golden Krust restaurant on East Gun Hill Road in the Bronx, New York. The pivotal year of 1993 signified Golden Krust’s relocation of its manufacturing operations to the South Bronx, eventually purchasing nearly the entire block from 172nd Street to Claremont Parkway on Park Avenue.123
            The business became so successful that the Hawthornes were encouraged to create franchises, and they seized the opportunity to do just that. Golden Krust became the first Caribbean-owned business in the U.S to be granted a franchise license. By 1996, they owned 17 restaurants throughout New York City. Today, Golden Krust Caribbean Restaurants operates over 125 restaurants in North America.",
            category: "Caribbean",
            price: "$")

        business4 = Business.create!(
            name: "Mirna's Pupuseria",
            latitude: 40.63741449262,
            longitude: -73.95262801534074,
            address: "1350 Flatbush Ave",
            city: "Brooklyn",
            state: "NY",
            zipcode: "11210",
            phone: "(347) 624-7935",
            website: "https://www.yelp.com/menu/mirnas-pupuseria-brooklyn",
            open_at: "7:00 AM",
            closed_at: "9:00 PM",
            about: "Specialties123
            Our business specializes in making the best Salvadorean Cuisine in town by choosing the best quality ingredients and our own family recipes that takes all those flavors to the next level. We provide a wide range of the best and most popular Salvadorean dishes which are specially prepared so YOU can visit our country and get close to our warm culture without even leaving your table. We go above and beyond your expectations to deliver on time and always with a lovely smile.",
            category: "Salvadoran",
            price: "$")

        business5 = Business.create!(
            name: "E Noodle",
            latitude: 40.62141967226665,
            longitude: -74.0263262846585,
            address: "8619 5th Ave",
            city: "Brooklyn",
            state: "NY",
            zipcode: "11209",
            phone: "(718) 238-3303",
            website: "https://www.enoodle.nyc/",
            open_at: "11:00 AM",
            closed_at: "10:00 PM",
            about: "Specialties123
            From hand-prepared food and fresh ingredients to perfectly cooked dishes, our traditional Hong Kong/Cantonese restaurant in Brooklyn, NY is unparalleled. When you walk through the doors of E Noodle Cafe you are met with the sensational smell of the finest Chinese cuisine in the area. From soup dumplings, to wonton soup, to fish skins, each dish is made with authentic spices to capture true Chinese flavors. Stop in for lunch or dinner today!123

            History123
            Established in 2016.123

            Well known Chinese Cantonese/Hong Kong Cafe cuisine (廣東菜) restaurants, #eNoodle restaurants span NYC 3 boroughs is one of the your best bets for Chinese take-out, and quick casual eat in dining. This restaurant offers modern interpretations of classic dishes, with a particularly diverse noodle menu. Besides noodle, we are known for soup dumpling, fried dumpling and steamed dumping as made by hands by staff in house using most fresh ingredients. #eNoodle",
            category: "Noodles, Cantonese, Hong Kong Style Cafe",
            price: "$$")

        business6 = Business.create!(
            name: "Beverly Pizza & Cafe",
            latitude: 40.64278291552419,
            longitude: -73.97830437791043,
            address: "358 E 2nd St",
            city: "Brooklyn",
            state: "NY",
            zipcode: "11218",
            phone: "(718) 431-0222",
            website: "https://beverlypizzacafe.com",
            open_at: "11:00 AM",
            closed_at: "10:30 PM",
            about: "Order your favorite pizza, pasta, salad, wings and more with Beverley Pizza & Cafe located at 358 E 2nd St in New York, NY. Beverley Pizza & Cafe is accepting orders online for delivery and takeout. To begin your order simply click on any menu category. Enjoy!",
            category: "Cafes, Italian, Pizza",
            price: "$")

    business1.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/1-devocion/photo_1.jpg"), filename: "photo_1.jpg")
    business1.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/1-devocion/photo_2.jpg"), filename: "photo_2.jpg")
    business1.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/1-devocion/photo_3.jpg"), filename: "photo_3.jpg")
    business1.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/1-devocion/store_photo_1.jpg"), filename: "store_photo_1.jpg")
    business1.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/1-devocion/store_photo_2.jpg"), filename: "store_photo_2.jpg")
    business1.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/1-devocion/popular-items/pop-item.jpg"), filename: "pop-item.jpg")
    business1.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/1-devocion/google-map.jpg"), filename: "google-map.jpg")

    business2.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/2-el-paso/photo_1.jpg"), filename: "photo_1.jpg")
    business2.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/2-el-paso/photo_2.jpg"), filename: "photo_2.jpg")
    business2.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/2-el-paso/photo_3.jpg"), filename: "photo_3.jpg")
    business2.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/2-el-paso/store_photo_1.jpg"), filename: "store_photo_1.jpg")
    business2.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/2-el-paso/store_photo_2.jpg"), filename: "store_photo_2.jpg")
    business2.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/2-el-paso/popular-items/pop-item.jpg"), filename: "pop-item.jpg")
    business2.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/2-el-paso/google-map.jpg"), filename: "google-map.jpg")

    business3.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/3-golden-krust/photo_1.jpg"), filename: "photo_1.jpg")
    business3.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/3-golden-krust/photo_2.jpg"), filename: "photo_2.jpg")
    business3.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/3-golden-krust/photo_3.jpg"), filename: "photo_3.jpg")
    business3.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/3-golden-krust/store_photo_1.jpg"), filename: "store_photo_1.jpg")
    business3.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/3-golden-krust/store_photo_2.jpg"), filename: "store_photo_2.jpg")
    business3.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/3-golden-krust/popular-items/pop-item.jpg"), filename: "pop-item.jpg")
    business3.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/3-golden-krust/google-map.jpg"), filename: "google-map.jpg")

    business4.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/4-mirnas-pupuseria/photo_1.jpg"), filename: "photo_1.jpg")
    business4.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/4-mirnas-pupuseria/photo_2.jpg"), filename: "photo_2.jpg")
    business4.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/4-mirnas-pupuseria/photo_3.jpg"), filename: "photo_3.jpg")
    business4.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/4-mirnas-pupuseria/store_photo_1.jpg"), filename: "store_photo_1.jpg")
    business4.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/4-mirnas-pupuseria/store_photo_2.jpg"), filename: "store_photo_2.jpg")
    business4.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/4-mirnas-pupuseria/popular-items/pop-item.jpg"), filename: "pop-item.jpg")
    business4.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/4-mirnas-pupuseria/google-map.jpg"), filename: "google-map.jpg")

    business5.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/5-e-noodle/photo_1.jpg"), filename: "photo_1.jpg")
    business5.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/5-e-noodle/photo_2.jpg"), filename: "photo_2.jpg")
    business5.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/5-e-noodle/photo_3.jpg"), filename: "photo_3.jpg")
    business5.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/5-e-noodle/store_photo_1.jpg"), filename: "store_photo_1.jpg")
    business5.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/5-e-noodle/store_photo_2.jpg"), filename: "store_photo_2.jpg")
    business5.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/5-e-noodle/popular-items/pop-item.jpg"), filename: "pop-item.jpg")
    business5.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/5-e-noodle/google-map.jpg"), filename: "google-map.jpg")

    business6.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/6-beverley-pizza/photo_1.jpg"), filename: "photo_1.jpg")
    business6.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/6-beverley-pizza/photo_2.jpg"), filename: "photo_2.jpg")
    business6.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/6-beverley-pizza/photo_3.jpg"), filename: "photo_3.jpg")
    business6.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/6-beverley-pizza/store_photo_1.jpg"), filename: "store_photo_1.jpg")
    business6.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/6-beverley-pizza/store_photo_2.jpg"), filename: "store_photo_2.jpg")
    business6.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/6-beverley-pizza/popular-items/pop-item.jpg"), filename: "pop-item.jpg")
    business6.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/6-beverley-pizza/google-map.jpg"), filename: "google-map.jpg")

    puts "Done!"
# end
