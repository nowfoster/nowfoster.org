# to use:
# ruby fauna_export.rb

require 'fauna'
require 'dotenv'
require 'csv'

class Record
  ATTRS = %i[createdAt includeAnswers firstName lastName email phone contactPreference
             levelOfInterest discussionTopics eventId answers]
  attr_accessor(*ATTRS)

  def initialize(attrs)
    attrs.each { |a, v| send("#{a}=", v) }
  end

  def to_csv_row
    ATTRS.map { |x| send(x) }
  end
end

Dotenv.load

fauna = Fauna::Client.new(secret: ENV['FAUNADB_SERVER_SECRET'])

# for each ref in the applications index, get the entire record and return it
applicants = Fauna::Query.expr { map(paginate(match(ref('indexes/applications')), size: 1000), ->(x) { get(x) }) }

result = fauna.query { applicants }

records = result[:data].map { |x| Record.new(x[:data]) }

CSV.open('data.csv', 'wb') do |csv|
  csv << Record::ATTRS
  records.each do |record|
    csv << record.to_csv_row
  end
end
