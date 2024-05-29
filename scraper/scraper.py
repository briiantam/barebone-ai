import os
from openai import OpenAI
from selenium import webdriver
from bs4 import BeautifulSoup

def scrape_and_analyze(url):
    # Initialize the Chrome driver
    driver = webdriver.Chrome()

    # Navigate to the webpage
    driver.get(url)

    # Get the page source HTML
    html = driver.page_source

    # Parse the HTML with BeautifulSoup
    soup = BeautifulSoup(html, 'html.parser')

    # Extract the text from the parsed HTML
    page_text = soup.get_text(separator='\n', strip=True)

    # Close the browser
    driver.quit()

    # OpenAI API setup
    client = OpenAI(
        api_key=os.environ.get("OPENAI_API_KEY")  # Ensure this environment variable is set
    )

    # Define a single combined prompt for ChatGPT
    combined_prompt = f"""
    You are a professional and smart business and technology analyst who is helping startups fundraise. Analyze the following company information and provide detailed responses for each section. Be specific and concise in your descriptions.

    Categories:
    1. A.I.
    2. B2B
    3. Blockchain
    4. Consumer
    5. Dev Tools
    6. eCommerce
    7. Education
    8. Fintech
    9. Government
    10. Healthcare
    11. Industrials
    12. Marketplace
    13. Real Estate
    14. Robotics
    15. SaaS

    Company Information:
    {page_text}

    Based on the company information provided, complete the form below:

    Company Description: Write a clear and concise description of the company, focusing on its core business, technology and unique value proposition. Output in the format "Company Description: [description]".
    Industry: Select and list exactly 3 categories from the predefined list that best describe the company's industry focus. Output in the format "Industry 1: [industry1], Industry 2: [industry2], Industry 3: [industry3]" but in separate lines for each industry.
    """

    # Call the OpenAI API using gpt-3.5-turbo with temperature and system message
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": combined_prompt}
        ],
        temperature=0.2,  # Lower temperature for more consistent responses
    )

    # Extract the response
    response_text = response.choices[0].message.content.strip()

    # Parse the response
    company_description = ""
    industry1 = ""
    industry2 = ""
    industry3 = ""

    lines = response_text.split('\n')
    for line in lines:
        if line.startswith("Company Description:"):
            company_description = line.replace("Company Description:", "").strip()
        elif line.startswith("Industry 1:"):
            industry1 = line.replace("Industry 1:", "").strip()
        elif line.startswith("Industry 2:"):
            industry2 = line.replace("Industry 2:", "").strip()
        elif line.startswith("Industry 3:"):
            industry3 = line.replace("Industry 3:", "").strip()

    # Return the parsed results
    return {
        "company_description": company_description,
        "industry": [industry1, industry2, industry3]
    }
