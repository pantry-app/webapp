import { AppHome, AppHeader, AppSideNav, AppRegister, AppLogin, AppState, AppRecipePage, AppShortcuts } from './app.po';
import { browser, logging } from 'protractor';

describe('App Header', () => {
  beforeEach(async () => {
    await AppShortcuts.reset();

    await AppHome.navigateTo();
  });

  it('should display the app name', () => {
    expect(AppHeader.getAppName()).toEqual('Pantry');
  });

  it('opens the sidenav', async () => {
    await AppHeader.sidenav.open();

    expect(AppSideNav.isOpen()).toBeTruthy();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);

    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

describe('Authentication', () => {
  // Register, Login, Logout

  beforeEach(async () => {
    await AppShortcuts.reset();
  });

  it('should register an account, then logout, then login', async () => {
    const email = 'test@example.com';
    const password = 'supersecurepassword123';

    // Perform registration
    await AppRegister.navigateTo();

    await AppRegister.form.values(email, password);

    await AppRegister.form.submit();

    // Confirm logged in by checking URL
    expect(AppState.currentUrl()).toContain('/dashboard/');

    // Perform logout
    await AppHeader.sidenav.open();

    await AppSideNav.click('Logout');

    // Confirm logged out by checking URL
    await expect(AppState.currentUrl()).not.toContain('/dashboard/');

    // Perform login
    await AppLogin.navigateTo();

    await AppLogin.form.values(email, password);

    await AppLogin.form.submit();

    // Confirm logged in by checking URL
    await expect(AppState.currentUrl()).toContain('/dashboard/');
  });
});

describe('Recipes', () => {
  // Add, edit, delete recipe

  beforeEach(async () => {
    await AppShortcuts.reset();
  });

  it('should create, then edit, then delete a recipe', async () => {
    // Login to the app
    await AppShortcuts.login();

    // Create a recipe
    const name = 'Vegan Chili';
    const url = 'https://sweetpeasandsaffron.com/vegan-crockpot-chili-freezer/';
    const notes = 'Can substitute kidney beans for black beans!';

    await AppRecipePage.create.open();

    await AppRecipePage.create.form.values(name, url, notes);
    await AppRecipePage.create.form.submit();

    // Confirm created
    expect(AppRecipePage.recipes.get(name).isPresent()).toBeTruthy();

    // Edit recipe
    const updatedName = 'Vegan Chili Deluxe';

    await AppRecipePage.edit.open(name);

    await AppRecipePage.edit.form.values(updatedName);
    await AppRecipePage.edit.form.submit();

    // Confirm edit
    expect(AppRecipePage.recipes.get(updatedName).isPresent()).toBeTruthy();

    // Delete recipe
    await AppRecipePage.remove(updatedName);

    // Wait for delete to occur
    await AppShortcuts.sleep(3000);

    // Refresh
    await AppShortcuts.refresh();

    // Confirm delete
    expect(AppRecipePage.recipes.get(updatedName).isPresent()).toBeFalsy();
  });

  it('should search for recipes based on name and active status', async () => {
    // Login to the app

    // Login to the app
    await AppShortcuts.login();

    // Create a couple recipes
    await AppShortcuts.recipes.create('Chili', true);
    await AppShortcuts.recipes.create('Tiki Masala', true);
    await AppShortcuts.recipes.create('Chickpea Curry', false);
    await AppShortcuts.recipes.create('Lentil Curry', false);

    // By Default, search should be by active = true
    let recipes: any[] = await AppRecipePage.recipes.all();

    await expect(recipes.length).toEqual(2);

    // Alphabetical
    await expect(recipes[0].name).toEqual('Chili');
    await expect(recipes[1].name).toEqual('Tiki Masala');

    // Search for recipe by name
    await AppRecipePage.search.open();
    await AppRecipePage.search.form.name('Chili');

    recipes = await AppRecipePage.recipes.all();

    await expect(recipes.length).toEqual(1);
    await expect(recipes[0].name).toEqual('Chili');

    // Search for recipe by active = false
    await AppRecipePage.search.form.name('');
    await AppRecipePage.search.form.active();

    recipes = await AppRecipePage.recipes.all();

    await expect(recipes.length).toEqual(2);

    // Alphabetical
    await expect(recipes[0].name).toEqual('Chickpea Curry');
    await expect(recipes[1].name).toEqual('Lentil Curry');
  });
});

describe('Ingredients', () => {
  // Add, edit, delete ingredient

  beforeEach(async () => {
    await AppShortcuts.reset();
  });

  it('should create, then edit, then delete an ingredient', async () => {
    // Login to the app
    await AppShortcuts.login();

    // Create a recipe
    const recipeName = 'Vegan Chili';

    await AppRecipePage.create.open();

    await AppRecipePage.create.form.values(recipeName);
    await AppRecipePage.create.form.submit();

    /*
     * Add the Ingredient via the Create Form
     */

    const ingredientName = 'Kidney beans';

    // Open the Add Ingredient dialog
    await AppRecipePage.ingredients.add(recipeName);

    // Select the Create tab
    await AppRecipePage.ingredients.create.openTab();

    // Fill in the form
    await AppRecipePage.ingredients.create.form.values(ingredientName);

    await AppRecipePage.ingredients.create.form.submit();

    // Confirm ingredient added to recipe
    let ingredients = await AppRecipePage.ingredients.getForRecipe(recipeName);

    await expect(ingredients.length).toEqual(1);
    await expect(ingredients[0].name).toEqual(ingredientName);

    // Edit the ingredient
    await AppRecipePage.ingredients.edit.open(recipeName, ingredientName);

    // Change the ingredient name
    const updatedIngredientName = 'Kidney Beans (12oz)';

    await AppRecipePage.ingredients.edit.form.values(updatedIngredientName);

    await AppRecipePage.ingredients.edit.form.submit();

    ingredients = await AppRecipePage.ingredients.getForRecipe(recipeName);

    await expect(ingredients.length).toEqual(1);
    await expect(ingredients[0].name).toEqual(updatedIngredientName);

    // Remove the ingredient from the recipe
    await AppRecipePage.ingredients.edit.open(recipeName, updatedIngredientName);

    await AppRecipePage.ingredients.edit.remove();

    // Confirm removal
    ingredients = await AppRecipePage.ingredients.getForRecipe(recipeName);

    await expect(ingredients.length).toEqual(0);

    /*
     * Add the Ingredient via the Existing Form
     */

    // Open the Add Ingredient dialog
    await AppRecipePage.ingredients.add(recipeName);

    // Already on the Existing tab

    // Select the ingredient
    await AppRecipePage.ingredients.create.existing.form.values(updatedIngredientName);

    await AppRecipePage.ingredients.create.form.submit();

    // Confirm ingredient added to recipe
    ingredients = await AppRecipePage.ingredients.getForRecipe(recipeName);

    await expect(ingredients.length).toEqual(1);
    await expect(ingredients[0].name).toEqual(updatedIngredientName);
  });
});

describe('Shopping List', () => {
  //
});

describe('History', () => {
  //
});

describe('Stats', () => {
  //
});

describe('Settings', () => {
  //
});
