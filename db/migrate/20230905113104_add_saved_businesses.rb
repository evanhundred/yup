class AddSavedBusinesses < ActiveRecord::Migration[7.0]
  def change
    create_join_table :users, :businesses, table_name: :saved_businesses do |t|
      t.bigint :saver_id, null: false
      # t.bigint :business_id, null: false

      t.timestamps
    end
    add_index :saved_businesses, :saver_id
    add_index :saved_businesses, :business_id
    add_foreign_key :saved_businesses, :users, column: :saver_id
    add_foreign_key :saved_businesses, :businesses, column: :business_id
  end
end
