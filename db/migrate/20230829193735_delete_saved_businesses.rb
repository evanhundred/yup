class DeleteSavedBusinesses < ActiveRecord::Migration[7.0]
  def change
    drop_table :saved_businesses
  end
end
