class CreateBizPhotoBoxes < ActiveRecord::Migration[7.0]
  def change
    create_table :biz_photo_boxes do |t|
      t.string :name, null: false
      t.bigint :business_id, null: false

      t.timestamps
    end

    add_foreign_key :biz_photo_boxes, :businesses, column: :business_id
    add_index :biz_photo_boxes, :name
  end
end
