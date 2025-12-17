import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const SnowEffect = () => {
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: number; delay: number; duration: number; color: string }>>([]);

  useEffect(() => {
    const colors = ['#fff', '#0EA5E9', '#F97316', '#8B5CF6', '#10B981', '#F59E0B'];
    const flakes = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
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
            color: flake.color,
          }}
        >
          ❄
        </div>
      ))}
    </>
  );
};

const ChristmasLights = () => {
  const lights = Array.from({ length: 20 }, (_, i) => i);
  const colors = ['#ef4444', '#22c55e', '#3b82f6', '#f59e0b', '#a855f7', '#ec4899'];
  
  return (
    <div className="absolute top-0 left-0 w-full h-16 pointer-events-none z-50 overflow-hidden">
      <div className="flex justify-around items-start h-full">
        {lights.map((i) => (
          <div
            key={i}
            className="lights-string w-3 h-3 rounded-full"
            style={{
              backgroundColor: colors[i % colors.length],
              animationDelay: `${i * 0.1}s`,
              boxShadow: `0 0 10px ${colors[i % colors.length]}`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

interface User {
  username: string;
  email: string;
  isPremium: boolean;
  registeredAt: string;
  servers: number;
  mods: number;
  posts: number;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>('main');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [installedMods, setInstalledMods] = useState<Set<string>>(new Set(['Радмир РП']));
  const { toast } = useToast();

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
      downloadUrl: '#',
    },
    {
      name: 'Аризона РП',
      platforms: ['ПК', 'Мобайл'],
      description: 'Современный лаунчер с поддержкой кастомизации',
      icon: 'Palmtree',
      downloadUrl: '#',
    },
    {
      name: 'Радмир РП',
      platforms: ['ПК', 'Мобайл'],
      description: 'Быстрый запуск с оптимизацией',
      icon: 'Zap',
      downloadUrl: '#',
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
      popular: true,
    },
    {
      name: 'Ultimate',
      price: 'Бесплатно',
      features: ['∞ серверов', '8 ГБ RAM', '100 ГБ диск', 'Premium поддержка'],
      icon: 'Crown',
    },
  ];

  const modPacks = [
    { name: 'Родина РП', mods: 45, size: '2.3 ГБ' },
    { name: 'Аризона РП', mods: 38, size: '1.8 ГБ' },
    { name: 'Радмир РП', mods: 52, size: '2.7 ГБ' },
  ];

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    
    const newUser: User = {
      username,
      email,
      isPremium: true,
      registeredAt: new Date().toLocaleDateString('ru-RU'),
      servers: 0,
      mods: 1,
      posts: 0,
    };
    
    setUser(newUser);
    setIsRegisterOpen(false);
    toast({
      title: '🎉 Добро пожаловать в Premium!',
      description: 'Вы получили Premium подписку навсегда бесплатно! ☃️',
    });
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mockUser: User = {
      username: 'Игрок #1234',
      email: 'player@ismailov.host',
      isPremium: true,
      registeredAt: '15.12.2024',
      servers: 3,
      mods: 12,
      posts: 48,
    };
    setUser(mockUser);
    setIsLoginOpen(false);
    toast({
      title: 'С возвращением! 🎄',
      description: 'Вы успешно вошли в систему',
    });
  };

  const handleDownloadLauncher = (launcher: string) => {
    toast({
      title: '⬇️ Загрузка начата',
      description: `Лаунчер ${launcher} скачивается...`,
    });
  };

  const handleCreateServer = (plan: string) => {
    if (!user) {
      toast({
        title: '❌ Требуется авторизация',
        description: 'Пожалуйста, войдите или зарегистрируйтесь',
      });
      setIsRegisterOpen(true);
      return;
    }
    toast({
      title: '✅ Сервер создан!',
      description: `Ваш ${plan} сервер готов к использованию`,
    });
    setUser({ ...user, servers: user.servers + 1 });
  };

  const handleInstallMods = (modPack: string) => {
    if (!user) {
      toast({
        title: '❌ Требуется авторизация',
        description: 'Пожалуйста, войдите или зарегистрируйтесь',
      });
      setIsRegisterOpen(true);
      return;
    }
    
    setInstalledMods(new Set([...installedMods, modPack]));
    toast({
      title: '✅ Моды установлены!',
      description: `Модпак ${modPack} успешно установлен`,
    });
    setUser({ ...user, mods: user.mods + 1 });
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'launchers':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-4 mb-12">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent glow-text">
                <span className="lights-string">🎮</span> Лаунчеры для CRMP <span className="lights-string">🎮</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Выберите лаунчер и настройте под свой проект
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {launchers.map((launcher) => (
                <Card key={launcher.name} className="hover:scale-105 transition-transform border-primary/20 bg-card/50 backdrop-blur float-animation">
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
                        <Badge key={platform} variant="secondary" className="lights-string">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() => handleDownloadLauncher(launcher.name)}
                    >
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
              <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent glow-text">
                <span className="lights-string">🖥️</span> Бесплатный Хостинг <span className="lights-string">🖥️</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Разместите свой сервер за пару кликов
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {hostingPlans.map((plan, idx) => (
                <Card
                  key={plan.name}
                  className={`hover:scale-105 transition-transform border-green-500/20 bg-card/50 backdrop-blur float-animation ${
                    plan.popular ? 'ring-2 ring-green-500' : ''
                  }`}
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-green-500/10">
                          <Icon name={plan.icon} className="text-green-400 lights-string" size={24} />
                        </div>
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                      </div>
                      {plan.popular && (
                        <Badge className="bg-green-500 text-white lights-string">Популярный</Badge>
                      )}
                    </div>
                    <div className="text-3xl font-bold text-green-400 glow-text">{plan.price}</div>
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
                    <Button 
                      className="w-full bg-green-500 hover:bg-green-600"
                      onClick={() => handleCreateServer(plan.name)}
                    >
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
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent glow-text">
                <span className="lights-string">📦</span> Автоустановка Модов <span className="lights-string">📦</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Все нужные моды одним кликом
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {modPacks.map((pack, idx) => (
                <Card key={pack.name} className="hover:scale-105 transition-transform border-purple-500/20 bg-card/50 backdrop-blur float-animation" style={{ animationDelay: `${idx * 0.2}s` }}>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-3 rounded-lg bg-purple-500/10">
                        <Icon name="Box" className="text-purple-400 lights-string" size={24} />
                      </div>
                      <CardTitle className="text-xl">{pack.name}</CardTitle>
                    </div>
                    <CardDescription>
                      {pack.mods} модов • {pack.size}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {installedMods.has(pack.name) ? (
                      <Badge className="w-full justify-center py-2 bg-green-500">
                        <Icon name="CheckCircle" size={16} className="mr-2" />
                        Установлено
                      </Badge>
                    ) : (
                      <Button 
                        className="w-full bg-purple-500 hover:bg-purple-600"
                        onClick={() => handleInstallMods(pack.name)}
                      >
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
              <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent glow-text">
                <span className="lights-string">💬</span> Форум Сообщества <span className="lights-string">💬</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Общайтесь с игроками в стиле Родины РП
              </p>
            </div>
            <div className="grid gap-4">
              {['Новости проекта', 'Помощь новичкам', 'Обсуждения', 'Предложения'].map((topic, idx) => (
                <Card key={topic} className="hover:scale-[1.02] transition-transform border-orange-500/20 bg-card/50 backdrop-blur float-animation" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <CardHeader className="flex-row items-center gap-4 space-y-0">
                    <div className="p-3 rounded-lg bg-orange-500/10">
                      <Icon name="MessageSquare" className="text-orange-400 lights-string" size={24} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{topic}</CardTitle>
                      <CardDescription>Последнее сообщение 5 минут назад</CardDescription>
                    </div>
                    <Badge variant="secondary" className="lights-string">42 темы</Badge>
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
              <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 bg-clip-text text-transparent glow-text">
                <span className="lights-string">👤</span> Профиль <span className="lights-string">👤</span>
              </h1>
            </div>
            {user ? (
              <Card className="border-pink-500/20 bg-card/50 backdrop-blur float-animation">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center ring-4 ring-yellow-500 ring-offset-4 ring-offset-background">
                    <Icon name="Crown" size={48} className="text-white lights-string" />
                  </div>
                  <Badge className="mx-auto mb-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold lights-string">
                    ⭐ PREMIUM ⭐
                  </Badge>
                  <CardTitle className="text-2xl">{user.username}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                  <CardDescription>Зарегистрирован {user.registeredAt}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 rounded-lg bg-secondary">
                      <div className="text-2xl font-bold text-pink-400 glow-text">{user.servers}</div>
                      <div className="text-sm text-muted-foreground">Сервера</div>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary">
                      <div className="text-2xl font-bold text-pink-400 glow-text">{user.mods}</div>
                      <div className="text-sm text-muted-foreground">Модпаков</div>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary">
                      <div className="text-2xl font-bold text-pink-400 glow-text">{user.posts}</div>
                      <div className="text-sm text-muted-foreground">Сообщений</div>
                    </div>
                  </div>
                  <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Icon name="Gift" size={20} className="lights-string" />
                        Преимущества Premium
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Icon name="Check" size={16} className="text-green-400" />
                        <span className="text-sm">Безлимитные серверы</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Check" size={16} className="text-green-400" />
                        <span className="text-sm">Приоритетная поддержка 24/7</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Check" size={16} className="text-green-400" />
                        <span className="text-sm">Все моды бесплатно</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Button 
                    className="w-full bg-pink-500 hover:bg-pink-600"
                    onClick={() => setUser(null)}
                  >
                    <Icon name="LogOut" size={16} className="mr-2" />
                    Выйти
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-pink-500/20 bg-card/50 backdrop-blur">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-pink-500/10 flex items-center justify-center">
                    <Icon name="User" size={48} className="text-pink-400" />
                  </div>
                  <CardTitle className="text-2xl">Войдите в аккаунт</CardTitle>
                  <CardDescription>Чтобы получить Premium доступ</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" onClick={() => setIsLoginOpen(true)}>
                    Войти
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => setIsRegisterOpen(true)}>
                    Зарегистрироваться
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 'support':
        return (
          <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent glow-text">
                <span className="lights-string">🎧</span> Поддержка <span className="lights-string">🎧</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Мы всегда рады помочь!
              </p>
            </div>
            <Card className="border-yellow-500/20 bg-card/50 backdrop-blur float-animation">
              <CardHeader className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-yellow-500/10 flex items-center justify-center">
                  <Icon name="Headphones" size={48} className="text-yellow-400 lights-string" />
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
                      <Icon name="Clock" size={20} className="lights-string" />
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
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent glow-text">
                Ismailov Host
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Полный комплекс инструментов для вашего CRMP проекта
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Badge className="text-base px-4 py-2 bg-primary/20 text-primary border-primary/50 lights-string">
                  Бесплатный хостинг
                </Badge>
                <Badge className="text-base px-4 py-2 bg-green-500/20 text-green-400 border-green-500/50 lights-string">
                  Автоустановка модов
                </Badge>
                <Badge className="text-base px-4 py-2 bg-purple-500/20 text-purple-400 border-purple-500/50 lights-string">
                  Готовые лаунчеры
                </Badge>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {navItems.map((item, idx) => (
                <Card
                  key={item.id}
                  className="hover:scale-105 transition-all cursor-pointer border-border/50 bg-card/50 backdrop-blur group float-animation"
                  onClick={() => setActiveSection(item.id)}
                  style={{ animationDelay: `${idx * 0.1}s` }}
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

            <Card className="border-primary/30 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 backdrop-blur float-animation">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl mb-2 glow-text">
                  <span className="lights-string">🎄</span> Новогодняя Акция! <span className="lights-string">🎄</span>
                </CardTitle>
                <CardDescription className="text-lg">
                  Premium подписка бесплатно при регистрации навсегда!
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-white text-lg px-8"
                  onClick={() => setIsRegisterOpen(true)}
                >
                  <Icon name="Gift" size={24} className="mr-2" />
                  Получить Premium ☃️
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
      <ChristmasLights />
      
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => setActiveSection('main')}
            className="flex items-center gap-3 hover:scale-105 transition-transform"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Icon name="Snowflake" size={24} className="text-white lights-string" />
            </div>
            <span className="text-2xl font-bold">Ismailov Host</span>
          </button>
          
          <div className="flex gap-2">
            {user ? (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setActiveSection('profile')}
              >
                <Icon name="User" size={16} className="mr-2" />
                {user.username}
                {user.isPremium && <Icon name="Crown" size={14} className="ml-2 text-yellow-400 lights-string" />}
              </Button>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => setIsLoginOpen(true)}>
                  <Icon name="LogIn" size={16} className="mr-2" />
                  Войти
                </Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => setIsRegisterOpen(true)}>
                  <Icon name="UserPlus" size={16} className="mr-2" />
                  Регистрация
                </Button>
              </>
            )}
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

      <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
        <DialogContent className="sm:max-w-md border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">
              <span className="lights-string">🎁</span> Регистрация + Premium <span className="lights-string">🎁</span>
            </DialogTitle>
            <DialogDescription className="text-center">
              Получите Premium подписку бесплатно навсегда!
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Имя пользователя</Label>
              <Input id="username" name="username" placeholder="Введите имя" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="example@mail.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input id="password" name="password" type="password" placeholder="••••••••" required />
            </div>
            <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30">
              <CardContent className="pt-4 space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Check" size={14} className="text-green-400" />
                  <span>Premium статус навсегда</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Check" size={14} className="text-green-400" />
                  <span>Безлимитные серверы</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Check" size={14} className="text-green-400" />
                  <span>Все моды бесплатно</span>
                </div>
              </CardContent>
            </Card>
            <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
              <Icon name="Crown" size={16} className="mr-2" />
              Зарегистрироваться с Premium
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">Вход</DialogTitle>
            <DialogDescription className="text-center">
              Войдите в свой аккаунт
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input id="login-email" name="email" type="email" placeholder="example@mail.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Пароль</Label>
              <Input id="login-password" name="password" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              <Icon name="LogIn" size={16} className="mr-2" />
              Войти
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
