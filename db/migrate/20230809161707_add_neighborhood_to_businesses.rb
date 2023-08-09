class AddNeighborhoodToBusinesses < ActiveRecord::Migration[7.0]
  def change
    add_column :businesses, :neighborhood, :string
  end
end
