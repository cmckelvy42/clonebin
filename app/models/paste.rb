# == Schema Information
#
# Table name: pastes
#
#  id              :bigint           not null, primary key
#  content         :text             not null
#  expiration_date :datetime
#  expired         :boolean          default(FALSE)
#  privacy         :integer          not null
#  title           :string           default("Untitled")
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  user_id         :integer          not null
#
# Indexes
#
#  index_pastes_on_content  (content)
#  index_pastes_on_title    (title)
#  index_pastes_on_user_id  (user_id)
#
class Paste < ApplicationRecord
    validates :content, :privacy, :user_id, presence:true
    validate :check_privacy
    validate :check_date
    validate :check_title
    belongs_to :user

    default_scope -> { where("expiration_date IS NULL OR expiration_date > ?", Time.now) }
    TIME_MODS = {
        1 => 10*60,
        2 => 60*60,
        3 => 24*60*60,
        4 => 7*24*60*60,
        5 => 2*7*24*60*60,
        6 => 30*24*60*60,
        7 => 6*30*24*60*60,
        8 => 365*24*60*60
    }

    def set_user(user)
        if (user)
            self.user_id = user.id
        else
            self.user_id = 1
        end
    end

    def expiration_selection=(selection)
        return if  selection.nil? || selection.length > 1
        selection = selection.to_i
        return unless selection >= 1 && selection <= 8
        self.expiration_date = Time.now + TIME_MODS[selection]
    end

    def check_date
        return if self.expiration_date.nil? || self.expiration_date > Time.now
        errors.add(:expiration_date, "Expiration date can not be in the past")
    end

    def check_privacy
        if !self.privacy || self.privacy > 2 || self.privacy < 0
            errors.add(:privacy, "invalid")
        elsif self.user_id == 1 && self.privacy > 1
            errors.add(:privacy, "cannot be set to \"private\" by guest users")
        end
    end

    def check_title
        self.title = "Untitled" if self.title == ""
        return
    end

    def self.delete_expired
        Paste.unscoped.where('expiration_date < ?', Time.now).delete_all
    end



end
