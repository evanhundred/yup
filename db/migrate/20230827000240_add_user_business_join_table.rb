class AddUserBusinessJoinTable < ActiveRecord::Migration[7.0]
  def change
    create_join_table :users, :businesses, table_name: :saved_businesses do |t|
      t.index :user_id
      t.index :business_id

      t.timestamps
    end
  end
end
