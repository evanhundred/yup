# frozen_string_literal: true

require 'open-uri'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
# ApplicationRecord.transaction do
puts 'Destroying tables...'
User.destroy_all
Review.destroy_all
SavedBusiness.destroy_all
OwnedBusiness.destroy_all
Business.destroy_all
# BizPhotoBox.destroy_all

puts 'Resetting primary keys...'
ApplicationRecord.connection.reset_pk_sequence!('users')
ApplicationRecord.connection.reset_pk_sequence!('businesses')
ApplicationRecord.connection.reset_pk_sequence!('reviews')
ApplicationRecord.connection.reset_pk_sequence!('saved_businesses')
ApplicationRecord.connection.reset_pk_sequence!('owned_businesses')

puts 'Creating users...'
users = []
users << User.create!(
  name: 'John B.',
  email: 'john@email.io',
  password: 'password'
)

10.times do
  first = Faker::Name.first_name
  users << User.create!({
                          name: "#{first} #{('A'..'Z').to_a.sample(1).first}.",
                          # email: first + "-" + (Faker::Creature::Animal.name)
                          email: Faker::Internet.unique.email(name: "#{first}.#{Faker::Creature::Animal.name}"),
                          password: 'password'
                        })
end

puts 'Creating businesses...'

# TOTAL_SEEDED_BUSINESSES = 6
# businesses = []

# TOTAL_SEEDED_BUSINESSES.times do |i|
#   business = Business.create!(File.read("./db/seed_businesses/business.#{i + 1}.rb"))
#   businesses << business
# end

# businesses_data = YAML.load_file('./businesseses_data.yml')
businesses_data = YAML.load_file(Rails.root.join('db', 'businesses_data.yml'))
image_names = YAML.load_file(Rails.root.join('db', 'business_photo_data.yml'))

businesses_data.each do |business_attrs|
  business = Business.create!(business_attrs)
  image_names.each do |image_name|
    business.photos.attach(
      io: URI.open("https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/#{business_attrs['aws_dir']}/#{image_name}"),
      filename: image_name
    )
  end
end

# photo_links = Dir.glob("")

# for business in businesses do
#   business.photos.attach()
# end

# businesses[0].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/1-devocion/photo_1.jpg'),
#   filename: 'photo_1.jpg'
# )
# businesses[0].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/1-devocion/photo_2.jpg'),
#   filename: 'photo_2.jpg'
# )
# businesses[0].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/1-devocion/photo_3.jpg'),
#   filename: 'photo_3.jpg'
# )
# businesses[0].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/1-devocion/store_photo_1.jpg'),
#   filename: 'store_photo_1.jpg'
# )
# businesses[0].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/1-devocion/store_photo_2.jpg'),
#   filename: 'store_photo_2.jpg'
# )
# businesses[0].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/1-devocion/popular-items/pop-item.jpg'),
#   filename: 'pop-item.jpg'
# )
# businesses[0].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/1-devocion/google-map.jpg'),
#   filename: 'google-map.jpg'
# )

# businesses[1].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/2-el-paso/photo_1.jpg'),
#   filename: 'photo_1.jpg'
# )
# businesses[1].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/2-el-paso/photo_2.jpg'),
#   filename: 'photo_2.jpg'
# )
# businesses[1].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/2-el-paso/photo_3.jpg'),
#   filename: 'photo_3.jpg'
# )
# businesses[1].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/2-el-paso/store_photo_1.jpg'),
#   filename: 'store_photo_1.jpg'
# )
# businesses[1].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/2-el-paso/store_photo_2.jpg'),
#   filename: 'store_photo_2.jpg'
# )
# businesses[1].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/2-el-paso/popular-items/pop-item.jpg'),
#   filename: 'pop-item.jpg'
# )
# businesses[1].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/2-el-paso/google-map.jpg'),
#   filename: 'google-map.jpg'
# )

# businesses[2].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/3-golden-krust/photo_1.jpg'),
#   filename: 'photo_1.jpg'
# )
# businesses[2].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/3-golden-krust/photo_2.jpg'),
#   filename: 'photo_2.jpg'
# )
# businesses[2].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/3-golden-krust/photo_3.jpg'),
#   filename: 'photo_3.jpg'
# )
# businesses[2].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/3-golden-krust/store_photo_1.jpg'),
#   filename: 'store_photo_1.jpg'
# )
# businesses[2].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/3-golden-krust/store_photo_2.jpg'),
#   filename: 'store_photo_2.jpg'
# )
# businesses[2].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/3-golden-krust/popular-items/pop-item.jpg'),
#   filename: 'pop-item.jpg'
# )
# businesses[2].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/3-golden-krust/google-map.jpg'),
#   filename: 'google-map.jpg'
# )

# businesses[3].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/4-mirnas-pupuseria/photo_1.jpg'),
#   filename: 'photo_1.jpg'
# )
# businesses[3].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/4-mirnas-pupuseria/photo_2.jpg'),
#   filename: 'photo_2.jpg'
# )
# businesses[3].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/4-mirnas-pupuseria/photo_3.jpg'),
#   filename: 'photo_3.jpg'
# )
# businesses[3].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/4-mirnas-pupuseria/store_photo_1.jpg'),
#   filename: 'store_photo_1.jpg'
# )
# businesses[3].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/4-mirnas-pupuseria/store_photo_2.jpg'),
#   filename: 'store_photo_2.jpg'
# )
# businesses[3].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/4-mirnas-pupuseria/popular-items/pop-item.jpg'),
#   filename: 'pop-item.jpg'
# )
# businesses[3].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/4-mirnas-pupuseria/google-map.jpg'),
#   filename: 'google-map.jpg'
# )

# businesses[4].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/5-e-noodle/photo_1.jpg'),
#   filename: 'photo_1.jpg'
# )
# businesses[4].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/5-e-noodle/photo_2.jpg'),
#   filename: 'photo_2.jpg'
# )
# businesses[4].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/5-e-noodle/photo_3.jpg'),
#   filename: 'photo_3.jpg'
# )
# businesses[4].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/5-e-noodle/store_photo_1.jpg'),
#   filename: 'store_photo_1.jpg'
# )
# businesses[4].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/5-e-noodle/store_photo_2.jpg'),
#   filename: 'store_photo_2.jpg'
# )
# businesses[4].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/5-e-noodle/popular-items/pop-item.jpg'),
#   filename: 'pop-item.jpg'
# )
# businesses[4].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/5-e-noodle/google-map.jpg'),
#   filename: 'google-map.jpg'
# )

# businesses[5].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/6-beverley-pizza/photo_1.jpg'),
#   filename: 'photo_1.jpg'
# )
# businesses[5].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/6-beverley-pizza/photo_2.jpg'),
#   filename: 'photo_2.jpg'
# )
# businesses[5].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/6-beverley-pizza/photo_3.jpg'),
#   filename: 'photo_3.jpg'
# )
# businesses[5].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/6-beverley-pizza/store_photo_1.jpg'),
#   filename: 'store_photo_1.jpg'
# )
# businesses[5].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/6-beverley-pizza/store_photo_2.jpg'),
#   filename: 'store_photo_2.jpg'
# )
# businesses[5].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/6-beverley-pizza/popular-items/pop-item.jpg'),
#   filename: 'pop-item.jpg'
# )
# businesses[5].photos.attach(
#   io: URI.open('https://yup-seeds.s3.us-east-2.amazonaws.com/seeds-images/6-beverley-pizza/google-map.jpg'),
#   filename: 'google-map.jpg'
# )

puts 'Done!'
