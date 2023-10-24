class AddColumnsToBusinesses < ActiveRecord::Migration[7.0]
  def change
    add_column :businesses, :country_code, :integer
    add_column :businesses, :country, :string
  end
end
