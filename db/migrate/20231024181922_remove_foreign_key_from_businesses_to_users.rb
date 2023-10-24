class RemoveForeignKeyFromBusinessesToUsers < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :businesses, column: :owner_id
    remove_column :businesses, :owner_id
  end
end
