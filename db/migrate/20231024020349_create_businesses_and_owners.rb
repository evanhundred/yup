class CreateBusinessesAndOwners < ActiveRecord::Migration[7.0]
  def change
    create_join_table :users, :businesses, table_name: :owned_businesses do |t|
      t.bigint :owned_business_id, null: false
      t.bigint :owner_id, null: false

      t.timestamps
    end
    add_index :owned_businesses, :owner_id
    add_index :owned_businesses, :owned_business_id
    add_index :owned_businesses, [:owned_business_id, :owner_id]
    add_foreign_key :owned_businesses, :users, column: :owner_id
    add_foreign_key :owned_businesses, :businesses, column: :owned_business_id
  end
end
