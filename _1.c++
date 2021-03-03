#include <iostream>
#include <string>
#include <sstream>
using namespace std;

int main() {
  int x1 = 0, y1 = 0, x2 = 10, y2 = 10;
  string mystr;
  cout << "Given window: ";
  getline (cin,mystr);
  stringstream(mystr) >> x1 >> y1 >> x2 >> y2;
  
  cout << x1 << " " << y1 << " " << x2 << " " << y2 << " "  << "\n";
  return 0;
}