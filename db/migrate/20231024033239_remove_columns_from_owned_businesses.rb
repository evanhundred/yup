class RemoveColumnsFromOwnedBusinesses < ActiveRecord::Migration[7.0]
  def change
    remove_column :owned_businesses, :user_id
    remove_column :owned_businesses, :business_id
  end
end
