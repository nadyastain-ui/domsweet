require 'fileutils'

template = File.read('project-house-1.html', encoding: 'utf-8')

projects = [
    {num: 1, title: "Дом 6х6 с террасой 6х2", size: "48", base_price: 753000, img1: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&q=80", img2: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"},
    {num: 2, title: "Дом 6х8 с террасой 8х2", size: "64", base_price: 931000, img1: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=600&q=80", img2: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=600&q=80"},
    {num: 3, title: "Дом 6х8", size: "48", base_price: 807000, img1: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&q=80", img2: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600&q=80"},
    {num: 4, title: "Дом 6х9 с террасой 6х2", size: "72", base_price: 1018000, img1: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80", img2: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"},
    {num: 5, title: "Дом 6х6 с мансардой, террасой и балконом 6х2", size: "96", base_price: 1473000, img1: "https://images.unsplash.com/photo-1588856804561-ebaeed52fdb9?w=600&q=80", img2: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80"},
    {num: 6, title: "Дом 8х7 с мансардой", size: "112", base_price: 1784000, img1: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", img2: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=600&q=80"},
    {num: 7, title: "Дом 7,5х11,5 с мансардой", size: "147", base_price: 2348000, img1: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", img2: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=600&q=80"}
]

projects.each do |p|
  t = template.dup
  
  prem_price = p[:base_price] + (p[:base_price] * 0.15).to_i
  price_base_str = p[:base_price].to_s.reverse.gsub(/...(?=.)/,'\& ').reverse
  price_prem_str = prem_price.to_s.reverse.gsub(/...(?=.)/,'\& ').reverse
  price_base_old_str = (p[:base_price] + (p[:base_price] * 0.10).to_i).to_s.reverse.gsub(/...(?=.)/,'\& ').reverse
  price_prem_old_str = (prem_price + (prem_price * 0.10).to_i).to_s.reverse.gsub(/...(?=.)/,'\& ').reverse

  t.sub!(/<title>.*<\/title>/, "<title>#{p[:title]} - Купить дом для ПМЖ под ключ | Уютный Дом</title>")
  t.sub!(/<meta name="description".*?>/, "<meta name=\"description\" content=\"Купить качественный каркасный дом для постоянного проживания: #{p[:title]}. Утепление 150-200мм. Свое производство в СПб.\">")
  
  t.gsub!('catalog-houses.html', 'catalog-winter-houses.html')
  t.gsub!('Дачные дома', 'Дома для круглогодичного проживания')
  t.sub!(/<span class="current">Дом 5х5 с террасой<\/span>/, "<span class=\"current\">#{p[:title]}</span>")
  
  t.sub!(/<h1 class="product-page-title"[^>]*>Дом 5х5 с террасой 2\.5х2м<\/h1>/, "<h1 class=\"product-page-title\" style=\"margin-bottom: 10px;\">#{p[:title]}</h1>")
  t.sub!(/<p class="product-page-desc".*?<\/p>/m, "<p class=\"product-page-desc\" style=\"max-width: 800px; margin: 0 auto; color: var(--color-text-muted);\">\n    Надежный и теплый дом для круглогодичного проживания (#{p[:size]} м²). Идеально подходит для комфортной жизни большой семьи за городом.\n                </p>")

  t.gsub!('https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&q=80', p[:img1])
  t.gsub!('https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&q=80', p[:img2])
  t.gsub!(/alt="Дом 5х5 с террасой вид \d+"/, "alt=\"#{p[:title]}\"")

  t.gsub!('❄️ Холодный контур', '🏠 Стандарт (150мм)')
  t.gsub!('🔥 Теплый контур', '🔥 Премиум (200мм)')

  t.gsub!('Брус 100х100 мм, 1 сорта', 'Брус 150х150 мм, 1 сорта')
  t.gsub!('Доска 40х100 мм, 1 сорта', 'Доска 50х150 мм, 1 сорта (Стандарт) / 50х200 мм (Премиум)')
  t.gsub!('OSB-3', 'Имитация бруса (хвоя)')
  t.gsub!('<td><span class="cross">✕</span> Нет</td>', '<td><span class="check">✓</span> Евровагонка (хвоя)</td>')
  t.sub!(/<td class="highlight-col highlight-changed"><span class="check">✓<\/span> OSB-3<\/td>/, '<td class="highlight-col highlight-changed"><span class="check">✓</span> Евровагонка (хвоя) кат. АB</td>')

  t.sub!(/<tr>\s*<td><strong>Утепление<\/strong><\/td>.*?<\/tr>/m, "<tr><td><strong>Утепление</strong></td><td><span class=\"check\">✓</span> Базальтовая вата 150 мм</td><td class=\"highlight-col highlight-changed\"><span class=\"check\">✓</span> Базальтовая вата 200 мм</td></tr>")
  t.sub!(/<tr>\s*<td><strong>Изоляция<\/strong><\/td>.*?<\/tr>/m, "<tr><td><strong>Изоляция</strong></td><td><span class=\"check\">✓</span> Ветровлагозащита / Пароизоляция</td><td class=\"highlight-col highlight-changed\"><span class=\"check\">✓</span> Усиленная мембрана (3 слоя)</td></tr>")

  t.sub!(/<div style="color: #999; text-decoration: line-through; font-size: 0\.9em;">295 000 ₽\s*<\/div>/, "<div style=\"color: #999; text-decoration: line-through; font-size: 0.9em;\">#{price_base_old_str} ₽</div>")
  t.sub!(/<strong style="color: var\(--color-primary\); font-size: 1\.2em;">254 000 ₽<\/strong>/, "<strong style=\"color: var(--color-primary); font-size: 1.2em;\">#{price_base_str} ₽</strong>")

  t.sub!(/<div style="color: #999; text-decoration: line-through; font-size: 0\.9em;">349 000 ₽\s*<\/div>/, "<div style=\"color: #999; text-decoration: line-through; font-size: 0.9em;\">#{price_prem_old_str} ₽</div>")
  t.sub!(/<strong style="color: var\(--color-primary\); font-size: 1\.2em;">301 000 ₽<\/strong>/, "<strong style=\"color: var(--color-primary); font-size: 1.2em;\">#{price_prem_str} ₽</strong>")

  t.sub!(/name="contour" value="254000"/, "name=\"contour\" value=\"#{p[:base_price]}\"")
  t.gsub!('Холодный контур', 'Стандартная комплектация (150мм)')
  t.sub!(/<span class="radio-price">254 000 ₽<\/span>/, "<span class=\"radio-price\">#{price_base_str} ₽</span>")

  t.sub!(/name="contour" value="301000"/, "name=\"contour\" value=\"#{prem_price}\"")
  t.gsub!('Теплый контур (50мм + Ондулин)', 'Премиум комплектация (200мм)')
  t.sub!(/<span class="radio-price">301 000 ₽<\/span>/, "<span class=\"radio-price\">#{price_prem_str} ₽</span>")

  t.sub!(/<div class="calc-total-price" id="calc-total">254 000 ₽<\/div>/, "<div class=\"calc-total-price\" id=\"calc-total\">#{price_base_str} ₽</div>")

  t.gsub!('Фундаментные блоки', 'Свайно-винтовой фундамент (базовый)')
  t.gsub!("Бетонные блоки 20х20х40 мм (надежное\n                                                основание)", 'Монтаж стальных винтовых свай с бетонированием')
  t.gsub!('+ 4 500 ₽', '+ 45 000 ₽')
  t.sub!('name="addon" value="4500"', 'name="addon" value="45000"')

  File.write("project-winter-house-#{p[:num]}.html", t)
end

puts "SUCCESS: Generated 7 winter houses"
