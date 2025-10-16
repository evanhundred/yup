class AddAwsDirToBusinesses < ActiveRecord::Migration[7.0]
  def change
    add_column :businesses, :aws_dir, :string
  end
end
