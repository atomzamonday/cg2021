// Original source code https://www.geeksforgeeks.org/mid-point-line-generation-algorithm/
// Modify by Chayoot Sathanbua 61070503404 for CPE361 Computer Graphics A3
// C++ program for Midpoint Line Drawing Algorithm.
#include <iostream>
#include <fstream>
#include <sstream>
#include <chrono>
#include <string>
using namespace std;
using namespace std::chrono;

int points[1025][1024];

// midPoint function for line generation
void midPoint(int X1, int Y1, int X2, int Y2) {
    // calculate dx & dy
    int dx = X2 - X1;
    int dy = Y2 - Y1;
   
    if(dy <= dx) {
        // initial value of decision parameter d
        int d = dy - (dx/2);
        int x = X1, y = Y1;

        // Plot initial given point
        points[x][y] = 1;
        // iterate through value of X
        while (x < X2) {
            x++;
            // E or East is chosen
            if (d < 0)
            {
                d = d + dy;
            }
            // NE or North East is chosen
            else
            {
                d += (dy - dx);
                y++;
            }

            // Plot intermediate points
            // putpixel(x,y) is used to print pixel
            // of line in graphics
            points[x][y] = 1;
        }
    }
   
    else if(dx < dy)
    {
        // initial value of decision parameter d
        int d = dx - (dy/2);
        int x = X1, y = Y1;
    
        // Plot initial given point
        //a.points[x][y] = 1;
        points[x][y] = 1;
        // iterate through value of X
        while (y < Y2)
        {
            y++;
            // E or East is chosen
            if (d < 0)
            {
                d = d + dx;
            }
    
            // NE or North East is chosen
            // NE or North East is chosen
            else
            {
                d += (dx - dy);
                x++;
            }
    
            // Plot intermediate points
            // putpixel(x,y) is used to print pixel
            // of line in graphics
            //a.points[x][y] = 1;
            points[x][y] = 1;
        }
    }
}

int main() {
    //cout << "\nProgram Started!\n";
    auto t1 = high_resolution_clock::now();
    string _line;
    ifstream inputFile("10000Lines_Case1.txt");
    if(inputFile.is_open()) {
        //cout << "Reading file...\n";
        while (getline (inputFile, _line)) {
            string points[4];
            string intermediate;
            stringstream s1(_line);
            int count = 0;
            while(getline(s1, intermediate, ' ')) 
            { 
                if(intermediate != "") {
                    points[count] = intermediate;
                    count++;
                }
            }
            midPoint(stoi(points[0]), stoi(points[1]), stoi(points[2]), stoi(points[3]));
        }
        inputFile.close();
    }
    else {
        cout << "Error! can't open test case file.\n";
        return -1;
    }

    ofstream outputFile("output.txt");
    string tmp = "";
    //cout << "Writing output result to file...\n";
    for(int i = 1023; i >= 0; i--) {
        for(int j = 0; j < 1024; j++) {
            if(points[i][j] == 1) {
                tmp.append("1");
            }
            else{
               tmp.append("0");
            }
        }
        tmp.append("\n");
    }
    outputFile << tmp;
    outputFile.close();
    auto t2 = high_resolution_clock::now();
    int duration = duration_cast<milliseconds>( t2 - t1 ).count();
    cout << "\nDone in " << duration << " ms\n\n";
    return 0;
}
