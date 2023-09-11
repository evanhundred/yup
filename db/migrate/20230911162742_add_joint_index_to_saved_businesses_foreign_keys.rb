class AddJointIndexToSavedBusinessesForeignKeys < ActiveRecord::Migration[7.0]
  def change
    add_index(:saved_businesses, [:saver_id, :saved_business_id])
  end
end
