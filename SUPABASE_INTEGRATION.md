# PayMore App - Supabase Integration

## Огляд

Цей проект тепер інтегрований з Supabase для зберігання даних котирувань та управління користувачами.

## Структура файлів

- `src/lib/supabase.ts` - Конфігурація Supabase клієнта
- `src/hooks/useSupabase.ts` - React хуки для роботи з Supabase
- `src/components/AuthComponent.tsx` - Компонент авторизації
- `src/utils/supabaseExamples.ts` - Приклади використання Supabase
- `.env` - Змінні середовища з ключами Supabase

## Налаштування

### 1. Змінні середовища

Файл `.env` вже налаштований з вашими ключами:
```
REACT_APP_SUPABASE_URL=https://ryeyasvyqimxnpjttlmc.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

# PayMore App - Supabase Integration

## Огляд

Цей проект інтегрований з Supabase для роботи з існуючою таблицею `price_list` та новою таблицею `quotes` для зберігання котирувань користувачів.

## Структура бази даних

### Існуюча таблиця: price_list

У вас вже є таблиця `price_list` з детальною структурою цін:

```sql
-- Ваша існуюча таблиця
CREATE TABLE public.price_list (
  id SERIAL PRIMARY KEY,
  device_name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  storage VARCHAR(50) NOT NULL,
  original_box BOOLEAN DEFAULT FALSE,
  original_charger BOOLEAN DEFAULT FALSE,
  unlocked BOOLEAN DEFAULT FALSE,
  battery_low TEXT,
  battery_medium TEXT,
  battery_good TEXT,
  battery_perfect TEXT,
  condition VARCHAR(20) CHECK (condition IN ('Excellent', 'Good', 'Fair')),
  sale_price DECIMAL(10, 2),
  paymore_margin DECIMAL(10, 2),
  shipping DECIMAL(10, 2) DEFAULT 0.00,
  no_box_deduction DECIMAL(10, 2) DEFAULT 0.00,
  no_charger_deduction DECIMAL(10, 2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Нова таблиця: quotes

Для зберігання котирувань користувачів створіть таблицю `quotes`:

```sql
-- Виконайте цей SQL в Supabase Dashboard
-- (Дивіться файл create_quotes_table.sql)
```

## Використання

### Пошук цін з price_list

```tsx
import { usePriceList } from './hooks/usePriceList';

function PriceSearch() {
  const { searchDevicePrices, getDevicePrice, loading, error } = usePriceList();
  
  const searchPrices = async () => {
    const results = await searchDevicePrices({
      device_name: 'iPhone 13',
      brand: 'Apple',
      storage: '128GB',
      condition: 'Good',
      original_box: true,
      original_charger: true
    });
    console.log(results);
  };
  
  return (
    <div>
      <button onClick={searchPrices}>Search Prices</button>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
}
```

### Авторизація

```tsx
import { useAuth } from './hooks/useSupabase';

function MyComponent() {
  const { user, signIn, signOut, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  if (user) {
    return <div>Welcome, {user.email}!</div>;
  }
  
  return <div>Please sign in</div>;
}
```

### Робота з котируваннями

```tsx
import { useSupabase } from './hooks/useSupabase';

function QuotesList() {
  const { fetchData, insertData, loading, error } = useSupabase();
  
  const loadQuotes = async () => {
    try {
      const quotes = await fetchData('quotes', {
        orderBy: { column: 'created_at', ascending: false }
      });
      console.log(quotes);
    } catch (err) {
      console.error('Error:', err);
    }
  };
  
  return (
    <div>
      <button onClick={loadQuotes}>Load Quotes</button>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
}
```

### Збереження котирування

Кодування автоматично зберігаються в Supabase при натисканні кнопки "Lock my quote":

```tsx
// В App.tsx функція submit() автоматично зберігає дані
await insertData('quotes', {
  ...payload,
  user_id: user?.id || null,
  created_at: new Date().toISOString(),
  status: 'pending'
});
```

## Функції

### useAuth Hook

- `user` - поточний користувач
- `session` - поточна сесія
- `loading` - стан завантаження
- `error` - помилка авторизації
- `signUp(email, password)` - реєстрація
- `signIn(email, password)` - вхід
- `signOut()` - вихід
- `resetPassword(email)` - скидання пароля

### useSupabase Hook

- `loading` - стан завантаження
- `error` - помилка операції
- `fetchData(table, options)` - отримання даних
- `insertData(table, data)` - додавання даних
- `updateData(table, id, data)` - оновлення даних
- `deleteData(table, id)` - видалення даних

## Приклади SQL запитів

### Отримання всіх котирувань
```sql
SELECT * FROM quotes ORDER BY created_at DESC;
```

### Котування конкретного користувача
```sql
SELECT * FROM quotes WHERE user_id = 'user-uuid' ORDER BY created_at DESC;
```

### Статистика по статусах
```sql
SELECT status, COUNT(*) FROM quotes GROUP BY status;
```

### Котування за категорією
```sql
SELECT * FROM quotes WHERE category = 'smartphones' ORDER BY created_at DESC;
```

## Безпека

- Використовуйте Row Level Security (RLS) для захисту даних
- Налаштуйте політики доступу в Supabase Dashboard
- Приклад політики для таблиці quotes:

```sql
-- Дозволити користувачам читати тільки свої котирування
CREATE POLICY "Users can view own quotes" ON quotes
  FOR SELECT USING (auth.uid() = user_id);

-- Дозволити користувачам створювати котирування
CREATE POLICY "Users can create quotes" ON quotes
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

## Наступні кроки

1. Створіть таблицю `quotes` в Supabase Dashboard
2. Налаштуйте Row Level Security
3. Додайте компонент авторизації в UI
4. Розширте функціональність згідно з потребами

## Підтримка

При виникненні проблем перевірте:
- Правильність змінних середовища
- Налаштування RLS політик
- Структуру таблиць в базі даних
- Консоль браузера на наявність помилок
