import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const SnowEffect = () => {
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const flakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <>
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`,
          }}
        >
          ❄
        </div>
      ))}
    </>
  );
};

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>('main');

  const navItems = [
    { id: 'launchers', title: 'Лаунчеры', icon: 'Rocket', color: 'bg-blue-500 hover:bg-blue-600' },
    { id: 'hosting', title: 'Хостинг', icon: 'Server', color: 'bg-green-500 hover:bg-green-600' },
    { id: 'mods', title: 'Моды', icon: 'Package', color: 'bg-purple-500 hover:bg-purple-600' },
    { id: 'forum', title: 'Форум', icon: 'MessageSquare', color: 'bg-orange-500 hover:bg-orange-600' },
    { id: 'profile', title: 'Профиль', icon: 'User', color: 'bg-pink-500 hover:bg-pink-600' },
    { id: 'support', title: 'Поддержка', icon: 'Headphones', color: 'bg-yellow-500 hover:bg-yellow-600' },
  ];

  const launchers = [
    {
      name: 'Родина РП',
      platforms: ['ПК', 'Мобайл'],
      description: 'Классический лаунчер с автоустановкой модов',
      icon: 'Home',
    },
    {
      name: 'Аризона РП',
      platforms: ['ПК', 'Мобайл'],
      description: 'Современный лаунчер с поддержкой кастомизации',
      icon: 'Palmtree',
    },
    {
      name: 'Радмир РП',
      platforms: ['ПК', 'Мобайл'],
      description: 'Быстрый запуск с оптимизацией',
      icon: 'Zap',
    },
  ];

  const hostingPlans = [
    {
      name: 'Starter',
      price: 'Бесплатно',
      features: ['1 сервер', '512 МБ RAM', '5 ГБ диск', 'Автоустановка модов'],
      icon: 'Sparkles',
    },
    {
      name: 'Pro',
      price: 'Бесплатно',
      features: ['3 сервера', '2 ГБ RAM', '20 ГБ диск', 'Автоустановка сайта'],
      icon: 'Star',
    },
    {
      name: 'Ultimate',
      price: 'Бесплатно',
      features: ['∞ серверов', '8 ГБ RAM', '100 ГБ диск', 'Приоритет'],
      icon: 'Crown',
    },
  ];

  const modPacks = [
    { name: 'Родина РП', mods: 45, size: '2.3 ГБ', installed: false },
    { name: 'Аризона РП', mods: 38, size: '1.8 ГБ', installed: false },
    { name: 'Радмир РП', mods: 52, size: '2.7 ГБ', installed: true },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'launchers':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-4 mb-12">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent lights-string">
                Лаунчеры для CRMP
              </h1>
              <p className="text-muted-foreground text-lg">
                Выберите лаунчер и настройте под свой проект
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {launchers.map((launcher) => (
                <Card key={launcher.name} className="hover:scale-105 transition-transform border-primary/20 bg-card/50 backdrop-blur">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon name={launcher.icon} className="text-primary" size={24} />
                      </div>
                      <CardTitle className="text-xl">{launcher.name}</CardTitle>
                    </div>
                    <CardDescription>{launcher.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2 flex-wrap">
                      {launcher.platforms.map((platform) => (
                        <Badge key={platform} variant="secondary">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <Icon name="Download" size={16} className="mr-2" />
                      Скачать
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'hosting':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-4 mb-12">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent lights-string">
                Бесплатный Хостинг
              </h1>
              <p className="text-muted-foreground text-lg">
                Разместите свой сервер за пару кликов
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {hostingPlans.map((plan, idx) => (
                <Card
                  key={plan.name}
                  className={`hover:scale-105 transition-transform border-green-500/20 bg-card/50 backdrop-blur ${
                    idx === 1 ? 'ring-2 ring-green-500' : ''
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-green-500/10">
                          <Icon name={plan.icon} className="text-green-400" size={24} />
                        </div>
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                      </div>
                      {idx === 1 && (
                        <Badge className="bg-green-500 text-white">Популярный</Badge>
                      )}
                    </div>
                    <div className="text-3xl font-bold text-green-400">{plan.price}</div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Icon name="Check" size={16} className="text-green-400" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-green-500 hover:bg-green-600">
                      Создать сервер
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'mods':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-4 mb-12">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent lights-string">
                Автоустановка Модов
              </h1>
              <p className="text-muted-foreground text-lg">
                Все нужные моды одним кликом
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {modPacks.map((pack) => (
                <Card key={pack.name} className="hover:scale-105 transition-transform border-purple-500/20 bg-card/50 backdrop-blur">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-3 rounded-lg bg-purple-500/10">
                        <Icon name="Box" className="text-purple-400" size={24} />
                      </div>
                      <CardTitle className="text-xl">{pack.name}</CardTitle>
                    </div>
                    <CardDescription>
                      {pack.mods} модов • {pack.size}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {pack.installed ? (
                      <Badge className="w-full justify-center py-2 bg-green-500">
                        <Icon name="CheckCircle" size={16} className="mr-2" />
                        Установлено
                      </Badge>
                    ) : (
                      <Button className="w-full bg-purple-500 hover:bg-purple-600">
                        <Icon name="Download" size={16} className="mr-2" />
                        Установить
                      </Button>
                    )}
                    <Button variant="outline" className="w-full">
                      <Icon name="Info" size={16} className="mr-2" />
                      Список модов
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'forum':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-4 mb-12">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent lights-string">
                Форум Сообщества
              </h1>
              <p className="text-muted-foreground text-lg">
                Общайтесь с игроками в стиле Родины РП
              </p>
            </div>
            <div className="grid gap-4">
              {['Новости проекта', 'Помощь новичкам', 'Обсуждения', 'Предложения'].map((topic) => (
                <Card key={topic} className="hover:scale-[1.02] transition-transform border-orange-500/20 bg-card/50 backdrop-blur">
                  <CardHeader className="flex-row items-center gap-4 space-y-0">
                    <div className="p-3 rounded-lg bg-orange-500/10">
                      <Icon name="MessageSquare" className="text-orange-400" size={24} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{topic}</CardTitle>
                      <CardDescription>Последнее сообщение 5 минут назад</CardDescription>
                    </div>
                    <Badge variant="secondary">42 темы</Badge>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 bg-clip-text text-transparent lights-string">
                Профиль
              </h1>
            </div>
            <Card className="border-pink-500/20 bg-card/50 backdrop-blur">
              <CardHeader className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-pink-500/10 flex items-center justify-center">
                  <Icon name="User" size={48} className="text-pink-400" />
                </div>
                <CardTitle className="text-2xl">Игрок #1234</CardTitle>
                <CardDescription>Зарегистрирован 15 декабря 2024</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-secondary">
                    <div className="text-2xl font-bold text-pink-400">3</div>
                    <div className="text-sm text-muted-foreground">Сервера</div>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary">
                    <div className="text-2xl font-bold text-pink-400">12</div>
                    <div className="text-sm text-muted-foreground">Модпаков</div>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary">
                    <div className="text-2xl font-bold text-pink-400">48</div>
                    <div className="text-sm text-muted-foreground">Сообщений</div>
                  </div>
                </div>
                <Button className="w-full bg-pink-500 hover:bg-pink-600">
                  <Icon name="Settings" size={16} className="mr-2" />
                  Настройки профиля
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case 'support':
        return (
          <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent lights-string">
                Поддержка
              </h1>
              <p className="text-muted-foreground text-lg">
                Мы всегда рады помочь!
              </p>
            </div>
            <Card className="border-yellow-500/20 bg-card/50 backdrop-blur">
              <CardHeader className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-yellow-500/10 flex items-center justify-center">
                  <Icon name="Headphones" size={48} className="text-yellow-400" />
                </div>
                <CardTitle className="text-2xl">Связаться с нами</CardTitle>
                <CardDescription>Выберите удобный способ связи</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  className="w-full h-16 text-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  onClick={() => window.open('https://t.me/vkqeex', '_blank')}
                >
                  <Icon name="Send" size={24} className="mr-3" />
                  Telegram: @vkqeex
                </Button>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-16">
                    <Icon name="Mail" size={20} className="mr-2" />
                    Email
                  </Button>
                  <Button variant="outline" className="h-16">
                    <Icon name="MessageCircle" size={20} className="mr-2" />
                    Чат
                  </Button>
                </div>
                <Card className="bg-secondary/50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Icon name="Clock" size={20} />
                      Часы работы
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Мы отвечаем 24/7 в течение 15 минут
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center space-y-6">
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent lights-string">
                Ismailov Host
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Полный комплекс инструментов для вашего CRMP проекта
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Badge className="text-base px-4 py-2 bg-primary/20 text-primary border-primary/50">
                  Бесплатный хостинг
                </Badge>
                <Badge className="text-base px-4 py-2 bg-green-500/20 text-green-400 border-green-500/50">
                  Автоустановка модов
                </Badge>
                <Badge className="text-base px-4 py-2 bg-purple-500/20 text-purple-400 border-purple-500/50">
                  Готовые лаунчеры
                </Badge>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {navItems.map((item) => (
                <Card
                  key={item.id}
                  className="hover:scale-105 transition-all cursor-pointer border-border/50 bg-card/50 backdrop-blur group"
                  onClick={() => setActiveSection(item.id)}
                >
                  <CardHeader className="text-center space-y-4">
                    <div className={`w-20 h-20 mx-auto rounded-2xl ${item.color} flex items-center justify-center transition-transform group-hover:rotate-12`}>
                      <Icon name={item.icon} size={40} className="text-white" />
                    </div>
                    <CardTitle className="text-2xl">{item.title}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <Card className="border-primary/30 bg-card/50 backdrop-blur">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl mb-2">Новогодняя Акция! 🎄</CardTitle>
                <CardDescription className="text-lg">
                  Безлимитный хостинг бесплатно навсегда
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white text-lg px-8">
                  <Icon name="Gift" size={24} className="mr-2" />
                  Получить подарок
                </Button>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 relative overflow-hidden">
      <SnowEffect />
      
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => setActiveSection('main')}
            className="flex items-center gap-3 hover:scale-105 transition-transform"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Icon name="Snowflake" size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold">Ismailov Host</span>
          </button>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Icon name="LogIn" size={16} className="mr-2" />
              Войти
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Icon name="UserPlus" size={16} className="mr-2" />
              Регистрация
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {renderContent()}
      </main>

      <footer className="mt-20 border-t border-border/50 bg-card/30 backdrop-blur">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p className="text-sm">
            © 2024 Ismailov Host. Новогодняя версия ❄️ Создано с любовью для CRMP сообщества
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
