@pastes.each do |paste|
    json.set! paste.id do
        json.partial! 'paste', paste:paste
    end
end