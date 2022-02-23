json.extract! @user, :name, :id, :picture_url, :created_at
json.pastes do
    @pastes.each do |paste|
        json.set! paste.id do
            json.extract! paste, :id, :title, :created_at, :expiration_date, :privacy
        end
    end
end

