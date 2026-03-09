files = ['project-house-1.html', 'project-house-2.html', 'project-house-3.html', 'project-house-4.html']

files.each do |file|
  next unless File.exist?(file)
  
  content = File.read(file, encoding: 'utf-8')
  
  # Replace patterns where "мм" is missing
  content.gsub!('Брус 100х100, 1-2 сорт', 'Брус 100х100 мм, 1-2 сорт')
  content.gsub!('Доска 40х100, 1-2 сорт', 'Доска 40х100 мм, 1-2 сорт')
  content.gsub!('Доска 25х100, 1-2 сорт', 'Доска 25х100 мм, 1-2 сорт')
  
  File.write(file, content)
end

puts "SUCCESS: Added 'мм' to all board dimensions in summer houses!"
