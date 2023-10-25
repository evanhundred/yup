class AddPrimaryKeyToOwnedBusinesses < ActiveRecord::Migration[7.0]
  def change
    add_column :owned_businesses, :id, :primary_key
  end
end
