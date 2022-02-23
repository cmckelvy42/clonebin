    json.extract! @paste, :content, :id, :expiration_date, :expired, :privacy, :title, :created_at, :updated_at
    json.author do
        json.extract! @paste.user, :id, :name, :picture_url
    end

