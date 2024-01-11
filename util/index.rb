require 'pry'

# name_string = Faker::Nation.nationality
# name_string = name_string.slice(0,name_string.length - 1)
# name_string = name_string.concat(" ").concat(Faker::Verb.base.capitalize())

name_string = Faker::Restaurant.name
state_abbr = Faker::Address.state_abbr

urlified_name = name_string.downcase.tr(' ', '-')

time_strings = {}
time_strings[:open] = Random.new.rand(12).to_s.concat(':00 AM')
time_strings[:closed] = Random.new.rand(12).to_s.concat(':00 PM')

price_num = Random.new.rand(4)
price_string = ""
price_num.times do
    price_string = price_string.concat('$')
end

neighborhood_string = Faker::BossaNova.artist
neighborhood_string_array = neighborhood_string.split(' ')
neighborhood_string = neighborhood_string_array.last.concat(' Heights')

# phone_string = Faker::PhoneNumber.phone_number
# phone_string = "#{phone_string_array[0]} #{phone_string_array[1]}"

phone_string_array = Faker::PhoneNumber.phone_number_with_country_code.split(' ')
phone_string = "#{phone_string_array[1]} #{phone_string_array[2]}"

# phone_string_array = phone_string_array[1].split('-')
# phone_string = Faker::PhoneNumber.phone_number_with_country_code
# phone_string = "(#{phone_string_array[0]})}"
# phone_string_array = phone_string_array[0].split('-')

# phone_string = `#{phone_string_array[0]}`

biz_object = {
    name: name_string,
    address: Faker::Address.street_address(include_secondary: false),
    zipcode: Faker::Address.zip_code(state_abbreviation: state_abbr),
    city: Faker::Address.city,
    state: state_abbr,
    latitude: 0.4071618202634479e2,
    longitude: -0.739646328800473e2,
    phone: phone_string,
    website: "https://www.#{urlified_name}.com/",
    open_at: time_strings[:open],
    closed_at: time_strings[:closed],
    about: Faker::Restaurant.description,
    category: Faker::Restaurant.type,
    price: price_string,
    neighborhood: neighborhood_string,
    place_id: "ChIJi7flemFZwokRDpIJuxfOGek",
    country_code: 1,
    country: "United States",
    stub: "true"
}

@new_biz = Business.new(biz_object)
@new_biz.save

own_object = {
    owner_id: 1,
    owned_business_id: @new_biz.id
}

@new_own = OwnedBusiness.new(own_object)
@new_own.save

# thanks
