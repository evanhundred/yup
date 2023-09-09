class AddPlaceIdColumnToBusinesses < ActiveRecord::Migration[7.0]
  def change
    add_column :businesses, :place_id, :string
  end
end
