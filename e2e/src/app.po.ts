import { browser, by, element, ExpectedConditions, Key } from 'protractor';

const DEFAULT_SLEEP_TIMEOUT = 100;

export class AppState {
  static currentUrl() {
    return browser.getCurrentUrl() as Promise<string>;
  }
}

const TEST_CREDENTIALS = {
  email: 'tester@tmk.name',
  password: 'supersecretpassword123',
};

export class AppLogin {
  static form = {
    async values(email: string, password: string) {
      await element(by.css('app-root app-login input[type=email]')).sendKeys(email);
      await element(by.css('app-root app-login input[type=password]')).sendKeys(password);
    },

    submit() {
      return element(by.css('app-root app-login button[type=submit]')).click() as Promise<any>;
    }
  };

  static navigateTo() {
    return browser.get('/auth/login') as Promise<any>;
  }
}

export class AppShortcuts {
  static async login() {
    await AppLogin.navigateTo();
    await AppLogin.form.values(TEST_CREDENTIALS.email, TEST_CREDENTIALS.password);
    await AppLogin.form.submit();
  }

  static async refresh() {
    await browser.refresh();
  }

  static async sleep(timeout: number) {
    await browser.sleep(timeout);
  }
}

export class AppHome {
  static navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }
}

export class AppHeader {
  static sidenav = {
    open() {
      return element(by.css('app-root app-header .sidenav-open'))
        .click() as Promise<any>;
    }
  };

  static getAppName() {
    return element(by.css('app-root app-header .app-name')).getText() as Promise<string>;
  }
}

export class AppSideNav {
  static isOpen() {
    return element(by.css('app-root app-sidenav .sidenav-title')).isDisplayed() as Promise<any>;
  }

  static click(target: string) {
    return element(by.cssContainingText('app-root app-sidenav .sidenav-link', target))
      .click() as Promise<any>;
  }
}

export class AppRegister {
  static form = {
    async values(email: string, password: string) {
      await element(by.css('app-root app-register input[type=email]')).sendKeys(email);
      await element(by.css('app-root app-register input[type=password]')).sendKeys(password);
    },

    submit() {
      return element(by.css('app-root app-register button[type=submit]')).click();
    }
  };

  static navigateTo() {
    return browser.get('/auth/register') as Promise<any>;
  }
}

export class AppRecipePage {
  static ingredients = {
    async add(recipeName: string) {
      const el = await element(by.cssContainingText('app-root app-recipe', recipeName));
      await el.$('button.menu')
        .click();

      await AppShortcuts.sleep(DEFAULT_SLEEP_TIMEOUT);

      await element(by.cssContainingText('button.mat-menu-item', 'Add Ingredient'))
        .click();
    },
    async getForRecipe(recipeName: string) {
      const recipe = await element(by.cssContainingText('app-root app-recipe', recipeName));
      const ingredients = await recipe.$$('.ingredient')
        .map(
          async (ef) => ({
            name: await ef.getText()
          })
        );
      return ingredients;
    },
    create: {
      async openTab() {
        await element(by.cssContainingText('app-create-ingredient .mat-tab-label', 'Create'))
          .click();

        await browser.wait(ExpectedConditions.elementToBeClickable(element(by.css('app-create-ingredient input[placeholder="name" i]'))));

        await AppShortcuts.sleep(DEFAULT_SLEEP_TIMEOUT);
      },
      form: {
        async values(name: string) {
          await element(by.css('app-create-ingredient input[placeholder="name" i]')).sendKeys(name);
          await AppShortcuts.sleep(DEFAULT_SLEEP_TIMEOUT * 3);
        },
        async submit() {
          await element(
            by.cssContainingText('app-create-ingredient button', 'Save')
          )
            .click();
        }
      },
      existing: {
        form: {
          async values(name: string) {
            await element(by.css('app-create-ingredient input[placeholder="ingredient" i]'))
              .sendKeys(name);
            await AppShortcuts.sleep(DEFAULT_SLEEP_TIMEOUT * 3);

            // Select from the drop-down via "down" key and "enter" key
            await element(by.css('app-create-ingredient input[placeholder="ingredient" i]'))
              .sendKeys(Key.ARROW_DOWN);
            await AppShortcuts.sleep(DEFAULT_SLEEP_TIMEOUT);

            await element(by.css('app-create-ingredient input[placeholder="ingredient" i]'))
              .sendKeys(Key.ENTER);
            await AppShortcuts.sleep(DEFAULT_SLEEP_TIMEOUT);
          }
        }
      }
    },
    edit: {
      async open(recipeName: string, ingredientName: string) {
        const recipe = await element(by.cssContainingText('app-root app-recipe', recipeName));

        await recipe.element(by.cssContainingText('.ingredient', ingredientName))
          .click();
      },
      async remove() {
        await element(by.css('app-edit-ingredient button.menu'))
          .click();

        await AppShortcuts.sleep(DEFAULT_SLEEP_TIMEOUT);

        await element(by.cssContainingText('button.mat-menu-item', 'Remove'))
          .click();
      },
      form: {
        async values(name: string) {
          await element(by.css('app-edit-ingredient input[placeholder="name" i]'))
            .clear();
          await element(by.css('app-edit-ingredient input[placeholder="name" i]'))
            .sendKeys(name);
          await AppShortcuts.sleep(DEFAULT_SLEEP_TIMEOUT * 3);
        },
        async submit() {
          await element(
            by.cssContainingText('app-edit-ingredient button', 'Save')
          )
            .click();
        }
      }
    },
  };

  static create = {
    form: {
      async values(name: string, url: string = '', notes: string = '') {
        await element(by.css('app-create-recipe input[placeholder="name" i]')).sendKeys(name);
        await AppShortcuts.sleep(DEFAULT_SLEEP_TIMEOUT);
        await element(by.css('app-create-recipe input[placeholder="url" i]')).sendKeys(url);
        await AppShortcuts.sleep(DEFAULT_SLEEP_TIMEOUT);
        await element(by.css('app-create-recipe textarea[placeholder="notes" i]')).sendKeys(notes);
      },
      submit() {
        return element(
          by.cssContainingText('app-create-recipe button', 'Save')
        )
          .click() as Promise<any>;
      }
    },
    open() {
      return element(by.css('app-root app-main #create-recipe-fab'))
        .click() as Promise<any>;
    }
  };

  static edit = {
    form: {
      async values(name: string, url: string = '', notes: string = '') {
        await element(by.css('app-edit-recipe input[placeholder="Name"]'))
          .clear();
        await element(by.css('app-edit-recipe input[placeholder="Name"]')).sendKeys(name);
        await AppShortcuts.sleep(DEFAULT_SLEEP_TIMEOUT);

        await element(by.css('app-edit-recipe input[placeholder="url" i]'))
          .clear();
        await element(by.css('app-edit-recipe input[placeholder="url" i]')).sendKeys(url);
        await AppShortcuts.sleep(DEFAULT_SLEEP_TIMEOUT);

        await element(by.css('app-edit-recipe textarea[placeholder="notes" i]'))
          .clear();
        await element(by.css('app-edit-recipe textarea[placeholder="notes" i]')).sendKeys(notes);
        await AppShortcuts.sleep(DEFAULT_SLEEP_TIMEOUT);
      },
      submit() {
        return element(
          by.cssContainingText('app-edit-recipe button', 'Save')
        )
          .click() as Promise<any>;
      }
    },
    async open(name: string) {
      const el = await element(by.cssContainingText('app-root app-recipe', name));
      await el.$('button.menu')
        .click();
      await AppShortcuts.sleep(DEFAULT_SLEEP_TIMEOUT);
      await element(by.cssContainingText('button.mat-menu-item', 'Edit'))
        .click();
    }
  };

  static recipes = {
    get(name: string) {
      return element(by.cssContainingText('app-root app-recipe', name));
    }
  };

  static async remove(name: string) {
    const el = await element(by.cssContainingText('app-root app-recipe', name));
    await el.$('button.menu')
      .click();
    await AppShortcuts.sleep(DEFAULT_SLEEP_TIMEOUT);
    await element(by.cssContainingText('button.mat-menu-item', 'Delete'))
      .click();
  }
}
