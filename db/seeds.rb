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

    business1 = Business.create!(name: "Devocion", lat: 40.71618202634479, lng: -73.9646328800473, address: "69 Grand St", city: "Brooklyn", state: "NY", zipcode: "11249", phone: "(718) 285-6180", website: "https://www.devocion.com/", open: "8:00AM", close: "7:00PM", category: "Coffee & Tea", price: "$")
    business1.photos.attach("../app/assets/images/iced-coffee-pastry.jpg")
    # business1.photos.attach(io: open("https://welp-development.s3.us-west-1.amazonaws.com/MILK%2BT.jpg"), filename: 'MILK+T.jpg')
    # business1.photos.attach(io: open('https://welp-development.s3.us-west-1.amazonaws.com/MILK%2BT2.jpg'), filename: 'MILK+T2.jpg')
    # business1.photos.attach(io: open('https://welp-development.s3.us-west-1.amazonaws.com/MilkT3.jpg'), filename: 'MilkT3.jpg')
    # business1.photos.attach(io: open('https://welp-development.s3.us-west-1.amazonaws.com/milktmap.png'), filename: 'milktmap.png')


    puts "Done!"
end
# first = Faker::Name.first_name
# first.concat(Faker::Creature::Animal.name)
