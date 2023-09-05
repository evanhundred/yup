class RemoveUserIdColumnFromSavedBusinesses < ActiveRecord::Migration[7.0]
  def change
    remove_column :saved_businesses, :user_id, :bigint
  end
end
