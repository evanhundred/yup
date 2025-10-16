class AddPhotosMetadataToBusinesses < ActiveRecord::Migration[7.0]
  def change
    add_column :businesses, :photos_metadata, :jsonb
  end
end
