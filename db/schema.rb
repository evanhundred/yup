# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_09_11_162742) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "biz_photo_boxes", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "business_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_biz_photo_boxes_on_name"
  end

  create_table "businesses", force: :cascade do |t|
    t.string "name", null: false
    t.string "address", null: false
    t.string "zipcode", null: false
    t.string "city", null: false
    t.string "state", null: false
    t.decimal "latitude"
    t.decimal "longitude"
    t.string "phone", null: false
    t.string "website"
    t.string "open_at", null: false
    t.string "closed_at", null: false
    t.text "about", null: false
    t.string "category", null: false
    t.string "price", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "neighborhood"
    t.string "place_id"
    t.index ["address"], name: "index_businesses_on_address"
    t.index ["city"], name: "index_businesses_on_city"
    t.index ["name"], name: "index_businesses_on_name"
    t.index ["zipcode"], name: "index_businesses_on_zipcode"
  end

  create_table "reviews", force: :cascade do |t|
    t.integer "rating", null: false
    t.text "body", null: false
    t.bigint "author_id", null: false
    t.bigint "business_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_reviews_on_author_id"
    t.index ["business_id"], name: "index_reviews_on_business_id"
  end

  create_table "saved_businesses", force: :cascade do |t|
    t.bigint "saved_business_id", null: false
    t.bigint "saver_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["saved_business_id"], name: "index_saved_businesses_on_saved_business_id"
    t.index ["saver_id", "saved_business_id"], name: "index_saved_businesses_on_saver_id_and_saved_business_id"
    t.index ["saver_id"], name: "index_saved_businesses_on_saver_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "name"
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "biz_photo_boxes", "businesses"
  add_foreign_key "reviews", "businesses"
  add_foreign_key "reviews", "users", column: "author_id"
  add_foreign_key "saved_businesses", "businesses", column: "saved_business_id"
  add_foreign_key "saved_businesses", "users", column: "saver_id"
end
