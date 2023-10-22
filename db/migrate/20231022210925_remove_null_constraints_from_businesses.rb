class RemoveNullConstraintsFromBusinesses < ActiveRecord::Migration[7.0]
  def change
    change_column_null :businesses, :open_at, true
    change_column_null :businesses, :closed_at, true
    change_column_null :businesses, :about, true
    change_column_null :businesses, :category, true
    change_column_null :businesses, :price, true
  end
end
