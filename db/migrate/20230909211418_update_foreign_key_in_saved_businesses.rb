class UpdateForeignKeyInSavedBusinesses < ActiveRecord::Migration[7.0]
  def change
    rename_column :saved_businesses, :business_id, :saved_business_id
    remove_foreign_key :saved_businesses, :businesses
    add_foreign_key :saved_businesses, :businesses, column: :saved_business_id
  end
end
