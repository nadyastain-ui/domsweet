require 'fileutils'

files = (1..7).map { |i| "project-winter-house-#{i}.html" }

files.each do |file|
  next unless File.exist?(file)
  
  content = File.read(file, encoding: 'utf-8')
  
  # Extract base price based on previous script where it was under calc-total or strong tag
  base_price = 0
  if content =~ /<div class="calc-total-price" id="calc-total">([\d\s]+) ₽<\/div>/
    base_price = $1.gsub(/\s+/, '').to_i
  elsif content =~ /<strong style="color: var\(--color-primary\); font-size: 1\.2em;">([\d\s]+) ₽<\/strong>/
    base_price = $1.gsub(/\s+/, '').to_i
  end
  
  if base_price == 0
    # Fallbacks based on initial creation parameters
    case file
    when 'project-winter-house-1.html' then base_price = 753000
    when 'project-winter-house-2.html' then base_price = 931000
    when 'project-winter-house-3.html' then base_price = 807000
    when 'project-winter-house-4.html' then base_price = 1018000
    when 'project-winter-house-5.html' then base_price = 1473000
    when 'project-winter-house-6.html' then base_price = 1784000
    when 'project-winter-house-7.html' then base_price = 2348000
    end
  end
  
  std_price = base_price + (base_price * 0.15).to_i
  comf_price = base_price + (base_price * 0.30).to_i
  
  def format_price(p)
    p.to_s.reverse.gsub(/...(?=.)/,'\& ').reverse
  end
  
  base_str = format_price(base_price)
  std_str = format_price(std_price)
  comf_str = format_price(comf_price)
  
  base_old = format_price((base_price * 1.1).to_i)
  std_old = format_price((std_price * 1.1).to_i)
  comf_old = format_price((comf_price * 1.1).to_i)
  
  new_table = <<-HTML
<table class="config-table">
                        <thead>
                            <tr>
                                <th>Элемент комплектации</th>
                                <th>❄️ Холодный контур</th>
                                <th>🏠 Стандарт</th>
                                <th class="highlight-col">⭐ Комфорт <div class="badge-recommend">Рекомендуем</div></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Основание</strong></td>
                                <td>Брус 100х150 мм, 1-2 сорт</td>
                                <td>Брус 100х150 мм, 1-2 сорт</td>
                                <td class="highlight-col">Брус 100х150 мм, 1-2 сорт</td>
                            </tr>
                            <tr>
                                <td><strong>Лаги пола</strong></td>
                                <td>Доска 40х100 мм, 1-2 сорт</td>
                                <td>Доска 40х100 мм, 1-2 сорт</td>
                                <td class="highlight-col">Доска 40х150 мм, 1-2 сорт</td>
                            </tr>
                            <tr>
                                <td><strong>Черновой пол</strong></td>
                                <td>Доска 25х100 мм, 1-2 сорт</td>
                                <td>Доска 25х100 мм, 1-2 сорт</td>
                                <td class="highlight-col">Доска 25х100 мм, 1-2 сорт</td>
                            </tr>
                            <tr>
                                <td><strong>Каркас</strong></td>
                                <td>Доска 40х100 мм, 1-2 сорт</td>
                                <td>Доска 40х100 мм, 1-2 сорт</td>
                                <td class="highlight-col">Доска 40х150 мм, 1-2 сорт</td>
                            </tr>
                            <tr>
                                <td><strong>Стропильная система</strong></td>
                                <td>Доска 40х100 мм, 1-2 сорт</td>
                                <td>Доска 40х100 мм, 1-2 сорт</td>
                                <td class="highlight-col">Доска 40х150 мм, 1-2 сорт</td>
                            </tr>
                            <tr>
                                <td><strong>Обрешетка крыши</strong></td>
                                <td>Доска 25х100 мм, 1-2 сорт</td>
                                <td>Доска 25х100 мм, 1-2 сорт</td>
                                <td class="highlight-col">Доска 25х100 мм, 1-2 сорт</td>
                            </tr>
                            <tr>
                                <td><strong>Внешняя отделка</strong></td>
                                <td>ОСБ, 9мм</td>
                                <td>ОСБ, 9мм</td>
                                <td class="highlight-col highlight-changed"><span class="check">✓</span> Имитатор бруса</td>
                            </tr>
                            <tr>
                                <td><strong>Кровля</strong></td>
                                <td>Рубероид</td>
                                <td class="highlight-changed"><span class="check">✓</span> Ондулин</td>
                                <td class="highlight-col highlight-changed"><span class="check">✓</span> Металлочерепица</td>
                            </tr>
                            <tr>
                                <td><strong>Ветрозащита</strong></td>
                                <td><span class="cross">✕</span> Нет</td>
                                <td class="highlight-changed"><span class="check">✓</span> Ондутис А</td>
                                <td class="highlight-col highlight-changed"><span class="check">✓</span> Ондутис А</td>
                            </tr>
                            <tr>
                                <td><strong>Утепление</strong></td>
                                <td><span class="cross">✕</span> Нет</td>
                                <td class="highlight-changed"><span class="check">✓</span> Мин. вата, 100мм</td>
                                <td class="highlight-col highlight-changed"><span class="check">✓</span> Мин. вата, 150мм</td>
                            </tr>
                            <tr>
                                <td><strong>Пароизоляция</strong></td>
                                <td><span class="cross">✕</span> Нет</td>
                                <td class="highlight-changed"><span class="check">✓</span> Ондутис В</td>
                                <td class="highlight-col highlight-changed"><span class="check">✓</span> Ондутис В</td>
                            </tr>
                            <tr>
                                <td><strong>Внутренняя отделка</strong></td>
                                <td><span class="cross">✕</span> Нет</td>
                                <td class="highlight-changed"><span class="check">✓</span> Евровагонка</td>
                                <td class="highlight-col highlight-changed"><span class="check">✓</span> Евровагонка</td>
                            </tr>
                            <tr>
                                <td><strong>Чистовой пол</strong></td>
                                <td><span class="cross">✕</span> Нет</td>
                                <td class="highlight-changed"><span class="check">✓</span> ОСБ, 9мм</td>
                                <td class="highlight-col highlight-changed"><span class="check">✓</span> Квик-дек ламинированный, 16мм</td>
                            </tr>
                            <tr class="price-row" style="font-size: 1.1em;">
                                <td style="text-align: right; padding-right: 20px;"><strong>Итоговая стоимость:</strong></td>
                                <td>
                                    <div style="color: #999; text-decoration: line-through; font-size: 0.9em;">#{base_old} ₽</div>
                                    <strong style="color: var(--color-primary); font-size: 1.2em;">#{base_str} ₽</strong>
                                </td>
                                <td>
                                    <div style="color: #999; text-decoration: line-through; font-size: 0.9em;">#{std_old} ₽</div>
                                    <strong style="color: var(--color-primary); font-size: 1.2em;">#{std_str} ₽</strong>
                                </td>
                                <td class="highlight-col">
                                    <div style="color: #999; text-decoration: line-through; font-size: 0.9em;">#{comf_old} ₽</div>
                                    <strong style="color: var(--color-primary); font-size: 1.2em;">#{comf_str} ₽</strong>
                                </td>
                            </tr>
                        </tbody>
                    </table>
HTML

  content.sub!(/<table class="config-table">.*?<\/table>/m, new_table.strip)

  new_radios = <<-HTML
<h4 class="calc-group-title">1. Выберите контур:</h4>
                            <div class="calc-options">
                                <label class="calc-radio">
                                    <input type="radio" name="contour" value="#{base_price}" checked onchange="calculateTotal()">
                                    <div class="calc-radio-box">
                                        <span class="radio-title">Холодный контур</span>
                                        <span class="radio-price">#{base_str} ₽</span>
                                    </div>
                                </label>
                                <label class="calc-radio">
                                    <input type="radio" name="contour" value="#{std_price}" onchange="calculateTotal()">
                                    <div class="calc-radio-box">
                                        <span class="radio-title">Стандарт</span>
                                        <span class="radio-price">#{std_str} ₽</span>
                                    </div>
                                </label>
                                <label class="calc-radio">
                                    <input type="radio" name="contour" value="#{comf_price}" onchange="calculateTotal()">
                                    <div class="calc-radio-box">
                                        <span class="radio-title">Комфорт</span>
                                        <span class="radio-price">#{comf_str} ₽</span>
                                    </div>
                                </label>
                            </div>
HTML

  content.sub!(/<h4 class="calc-group-title">1\. Выберите контур:.*?<\/div>\s*<\/div>/m, new_radios.strip + "\n                        </div>")

  File.write(file, content)
end

puts "SUCCESS: Updated 7 winter houses configurations!"
