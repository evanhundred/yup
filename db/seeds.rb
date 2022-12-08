require "open-uri"

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
ApplicationRecord.transaction do
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
        name: "Devocion",
        latitude: 40.71618202634479,
        longitude: -73.9646328800473,
        address: "69 Grand St",
        city: "Brooklyn",
        state: "NY",
        zipcode: "11249",
        phone: "(718) 285-6180",
        website: "https://www.devocion.com/",
        open_at: "8:00AM",
        closed_at: "7:00PM",
        about: "Specialties123
        Farm-to-table coffee roasters. We average 10 days from origin to roast, serving the freshest imaginable.\n
        History123
        Established in 2006.123
        Devoción was Launched in 2006 to produce the freshest coffee imaginable -- roasting provides only half of coffee's flavor, while the mere freshness of the beans does the rest of the work. And yet, most coffee beans sit around for months, losing flavor every day. That's why the Devoción team does everything short of picking the cherry, and do it faster than anyone else -- we hand-select our 1,000+ farm partners, dry-mill at our Bogotá facility, control the export process, and freshly roast in Brooklyn. You will taste the difference in a single sip.",
        category: "Coffee & Tea",
        price: "$")
    # business1.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/images/1-devocion/flatbread.jpg"), filename: "flatbread.jpg")
    # business1.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/images/1-devocion/iced-coffee-outside.jpg"), filename: "iced-coffee-outside.jpg")
    # business1.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/images/1-devocion/iced-coffee-pastry.jpg"), filename: "iced-coffee-pastry.jpg")
    # business1.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/images/1-devocion/indoor.jpg"), filename: "indoor.jpg")
    # business1.photos.attach(io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/images/1-devocion/storefront.jpg"), filename: "storefront.jpg")



    puts "Done!"
end
# first = Faker::Name.first_name
# first.concat(Faker::Creature::Animal.name)
