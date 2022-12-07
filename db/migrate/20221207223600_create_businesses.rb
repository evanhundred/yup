class CreateBusinesses < ActiveRecord::Migration[7.0]
  def change
    create_table :businesses do |t|
      t.string :name, null:false
      t.string :address, null:false
      t.string :zipcode, null:false
      t.string :city, null:false
      t.string :state, null:false
      t.decimal :latitude
      t.decimal :longitude
      t.string :phone, null:false
      t.string :website
      t.string :open_at, null:false
      t.string :closed_at, null:false
      t.text :about, null:false
      t.string :category, null:false
      t.string :price, null:false

      t.timestamps
    end
    add_index :businesses, :name
    add_index :businesses, :address
    add_index :businesses, :city
    add_index :businesses, :zipcode

  end
end
