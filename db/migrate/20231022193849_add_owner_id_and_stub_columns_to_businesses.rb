class AddOwnerIdAndStubColumnsToBusinesses < ActiveRecord::Migration[7.0]
  def change
    add_column :businesses, :stub, :boolean
    add_column :businesses, :owner_id, :bigint
    add_foreign_key :businesses, :users, column: :owner_id
  end
end
