require 'pry'

biz_object = {
    name: Faker::Name.first_name,
    address: "Zoney lane",
    zipcode: "11249",
    city: "Brooklyn",
    state: "NY",
    latitude: 0.4071618202634479e2,
    longitude: -0.739646328800473e2,
    phone: "(718) 285-6180",
    website: "https://www.devocion.com/",
    open_at: "8:00 AM",
    closed_at: "7:00 PM",
    about:
     "Farm-to-table coffee roasters. We average 10 days from origin to roast, serving the freshest coffee\n            imaginable.",
    category: "Coffee & Tea",
    price: "$",
    neighborhood: "Williamsburg",
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
