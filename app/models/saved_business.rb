class SavedBusiness < ApplicationRecord

    belongs_to :user,
        # primary_key: :user_id,
        foreign_key: :saved_business_id,
        inverse_of: :saved_businesses

    belongs_to :business,
        foreign_key: :save_id,
        # primary_key: :business_id,
        inverse_of: :saves

end
