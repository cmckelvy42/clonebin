# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  keyword_1       :string
#  keyword_2       :string
#  keyword_3       :string
#  name            :string           not null
#  password_digest :string           not null
#  picture_url     :string           not null
#  session_token   :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email          (email) UNIQUE
#  index_users_on_name           (name) UNIQUE
#  index_users_on_session_token  (session_token) UNIQUE
#
class User < ApplicationRecord
    validates :email, :name, :session_token, uniqueness:true
    validates :password, length: { minimum: 6, allow_nil: true }
    validates :email, :name, :password_digest, :session_token, presence: true
    validates_format_of :name, with: /\A^[A-Za-z0-9]+$\z/
    validate :default_picture?
    after_initialize :ensure_session_token

    has_many :pastes

    attr_reader :password

    def default_picture?
        self.picture_url = ActionController::Base.helpers.asset_path("guest.png") if (!self.picture_url)
    end
    
    def reset_session_token
        self.session_token = User.generate_session_token
        self.save!
        self.session_token
    end

    def self.generate_session_token
        token = SecureRandom.urlsafe_base64(16)
        while User.exists?(session_token: token)
            token = SecureRandom.urlsafe_base64(16)
        end
        token
    end

    def ensure_session_token
        self.session_token ||= User.generate_session_token
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def self.lookup_by_name(name, password)
        user = User.find_by(name:name)
        user && user.is_password?(password) ? user : nil
    end
end
