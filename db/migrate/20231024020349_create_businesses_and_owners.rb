class CreateBusinessesAndOwners < ActiveRecord::Migration[7.0]
  def change
    create_join_table :businesses, :users, table_name: :businesses_owners, id: false do |t|
      t.bigint :business_id, null: false
      t.bigint :owner_id, null: false

      t.timestamps
    end
    add_index :businesses_owners, :business_id
    add_index :businesses_owners, :owner_id
    add_index :businesses_owners, [:business_id, :owner_id]
  end
end
