class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.integer :rating, null: false
      t.text :body, null: false
      t.bigint :author_id, null: false
      t.bigint :business_id, null: false

      t.timestamps
    end
    add_index :reviews, :author_id
    add_index :reviews, :business_id
    add_foreign_key :reviews, :users, column: :author_id
    add_foreign_key :reviews, :businesses, column: :business_id
  end
end
